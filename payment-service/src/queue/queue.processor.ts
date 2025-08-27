import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentLog, LogLevel } from '../database/entities/payment-log.entity';

@Processor('payment-logs')
export class QueueProcessor {
  constructor(
    @InjectRepository(PaymentLog)
    private paymentLogRepository: Repository<PaymentLog>,
  ) {}

  @Process('store-log')
  async handleStoreLog(job: Job) {
    const {
      level,
      message,
      metadata,
      payment_id,
      omise_charge_id,
      action,
      status,
    } = job.data;

    try {
      const paymentLog = this.paymentLogRepository.create({
        level: level as LogLevel,
        message,
        metadata,
        payment_id,
        omise_charge_id,
        action,
        status,
      });

      await this.paymentLogRepository.save(paymentLog);
      console.log(`✅ Log stored successfully: ${message}`);
    } catch (error) {
      console.error('❌ Failed to store log:', error);
      throw error;
    }
  }
}
