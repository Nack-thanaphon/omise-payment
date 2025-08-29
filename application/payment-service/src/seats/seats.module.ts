import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { Seat } from '../database/entities/seat.entity';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    BullModule.registerQueue({
      name: 'payment-logs',
    }),
    LoggerModule,
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
