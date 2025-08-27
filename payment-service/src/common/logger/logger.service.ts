import { Injectable } from '@nestjs/common';
import { createLogger, Logger, format, transports } from 'winston';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(
    @InjectQueue('payment-logs') private readonly paymentLogsQueue: Queue,
  ) {
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
  }

  async logPayment(
    level: string,
    message: string,
    metadata?: any,
    paymentId?: string,
    omiseChargeId?: string,
    action?: string,
    status?: string,
  ) {
    const logData = {
      level,
      message,
      metadata,
      payment_id: paymentId,
      omise_charge_id: omiseChargeId,
      action,
      status,
      timestamp: new Date().toISOString(),
    };

    // Log to Winston
    this.logger.log(level, message, logData);

    // Queue for database storage
    await this.paymentLogsQueue.add('store-log', logData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  info(message: string, metadata?: any) {
    this.logger.info(message, metadata);
  }

  error(message: string, error?: Error, metadata?: any) {
    this.logger.error(message, { error: error?.stack, ...metadata });
  }

  warn(message: string, metadata?: any) {
    this.logger.warn(message, metadata);
  }

  debug(message: string, metadata?: any) {
    this.logger.debug(message, metadata);
  }
}
