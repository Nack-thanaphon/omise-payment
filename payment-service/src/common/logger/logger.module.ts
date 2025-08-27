import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payment-logs',
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
