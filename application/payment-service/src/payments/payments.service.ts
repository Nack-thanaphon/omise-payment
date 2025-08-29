import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Payment,
  PaymentStatus,
  PaymentMethod,
} from '../database/entities/payment.entity';
import { Seat, SeatStatus } from '../database/entities/seat.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import * as omise from 'omise';

@Injectable()
export class PaymentsService {
  private omiseClient: any;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    private loggerService: LoggerService,
  ) {
    this.omiseClient = omise({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      secretKey: process.env.OMISE_SECRET_KEY,
    });
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const {
      amount,
      currency,
      payment_method,
      seat_id,
      customer_email,
      description,
    } = createPaymentDto;

    try {
      // Check if seat is available if seat_id is provided
      let seat = null;
      if (seat_id) {
        seat = await this.seatRepository.findOne({ where: { id: seat_id } });
        if (!seat) {
          throw new NotFoundException('Seat not found');
        }
        if (seat.status !== SeatStatus.AVAILABLE) {
          throw new Error('Seat is not available');
        }
      }

      // Create Omise charge
      const charge = await this.omiseClient.charges.create({
        amount: Math.round(amount * 100), // Convert to satang/cents
        currency: currency || 'THB',
        description: description || 'Payment for reservation',
        metadata: {
          seat_id,
          customer_email,
        },
      });

      // Create payment record
      const payment = this.paymentRepository.create({
        omise_charge_id: charge.id,
        amount,
        currency: currency || 'THB',
        status: PaymentStatus.PENDING,
        payment_method: payment_method as PaymentMethod,
        customer_email,
        description,
        seat_id,
        metadata: { omise_charge: charge },
      });

      const savedPayment = await this.paymentRepository.save(payment);

      // Reserve seat if provided
      if (seat) {
        seat.status = SeatStatus.RESERVED;
        seat.reserved_until = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        seat.reserved_by = customer_email;
        await this.seatRepository.save(seat);
      }

      // Log the payment creation
      await this.loggerService.logPayment(
        'info',
        'Payment created successfully',
        { payment_id: savedPayment.id, charge_id: charge.id },
        savedPayment.id,
        charge.id,
        'create_payment',
        'pending',
      );

      return savedPayment;
    } catch (error) {
      await this.loggerService.logPayment(
        'error',
        'Failed to create payment',
        { error: error.message, ...createPaymentDto },
        null,
        null,
        'create_payment',
        'failed',
      );
      throw error;
    }
  }

  async getPayment(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['seat'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async getPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['seat'],
      order: { created_at: 'DESC' },
    });
  }

  async updatePaymentStatus(
    omiseChargeId: string,
    status: PaymentStatus,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { omise_charge_id: omiseChargeId },
      relations: ['seat'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = status;
    const updatedPayment = await this.paymentRepository.save(payment);

    // Update seat status based on payment status
    if (payment.seat) {
      if (status === PaymentStatus.PAID) {
        payment.seat.status = SeatStatus.OCCUPIED;
        payment.seat.reserved_until = null;
      } else if (
        status === PaymentStatus.FAILED ||
        status === PaymentStatus.CANCELLED
      ) {
        payment.seat.status = SeatStatus.AVAILABLE;
        payment.seat.reserved_until = null;
        payment.seat.reserved_by = null;
      }
      await this.seatRepository.save(payment.seat);
    }

    await this.loggerService.logPayment(
      'info',
      `Payment status updated to ${status}`,
      { payment_id: payment.id },
      payment.id,
      omiseChargeId,
      'update_status',
      status,
    );

    return updatedPayment;
  }
}
