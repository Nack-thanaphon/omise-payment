import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullBoardController } from './bull-board.controller';
import { BullBoardService } from './bull-board.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payment-logs',
    }),
  ],
  controllers: [BullBoardController],
  providers: [BullBoardService],
  exports: [BullBoardService],
})
export class BullBoardModule {}
