import { Injectable } from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';
import { LoggerService } from '../common/logger/logger.service';
import { PaymentStatus } from '../database/entities/payment.entity';
import * as crypto from 'crypto';

@Injectable()
export class WebhookService {
  constructor(
    private paymentsService: PaymentsService,
    private loggerService: LoggerService,
  ) {}

  async handleOmiseWebhook(
    body: any,
    headers: any,
    rawBody: Buffer,
  ): Promise<{ status: string }> {
    try {
      // Verify webhook signature
      const signature = headers['x-omise-signature'];
      if (signature && process.env.OMISE_WEBHOOK_SECRET) {
        const expectedSignature = crypto
          .createHmac('sha256', process.env.OMISE_WEBHOOK_SECRET)
          .update(rawBody)
          .digest('hex');

        if (signature !== expectedSignature) {
          await this.loggerService.logPayment(
            'warn',
            'Invalid webhook signature',
            { signature, expected: expectedSignature },
            null,
            null,
            'webhook_verification',
            'failed',
          );
          throw new Error('Invalid webhook signature');
        }
      }

      const { key: eventType, data } = body;
      const charge = data;

      await this.loggerService.logPayment(
        'info',
        `Webhook received: ${eventType}`,
        { event: body },
        null,
        charge.id,
        'webhook_received',
        eventType,
      );

      let newStatus: PaymentStatus;

      switch (eventType) {
        case 'charge.complete':
          newStatus = PaymentStatus.PAID;
          break;
        case 'charge.failed':
          newStatus = PaymentStatus.FAILED;
          break;
        case 'charge.pending':
          newStatus = PaymentStatus.PENDING;
          break;
        case 'charge.reversed':
          newStatus = PaymentStatus.REFUNDED;
          break;
        default:
          await this.loggerService.logPayment(
            'warn',
            `Unhandled webhook event: ${eventType}`,
            { event: body },
            null,
            charge.id,
            'webhook_unhandled',
            eventType,
          );
          return { status: 'ignored' };
      }

      // Update payment status
      await this.paymentsService.updatePaymentStatus(charge.id, newStatus);

      return { status: 'success' };
    } catch (error) {
      await this.loggerService.logPayment(
        'error',
        'Webhook processing failed',
        { error: error.message, body },
        null,
        null,
        'webhook_error',
        'failed',
      );
      throw error;
    }
  }
}
