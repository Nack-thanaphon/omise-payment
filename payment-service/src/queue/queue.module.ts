import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueProcessor } from './queue.processor';
import { PaymentLog } from '../database/entities/payment-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentLog]),
    BullModule.registerQueue({
      name: 'payment-logs',
    }),
  ],
  providers: [QueueProcessor],
})
export class QueueModule {}
