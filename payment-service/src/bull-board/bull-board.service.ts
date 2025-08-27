import { Injectable, OnModuleInit } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BullBoardService implements OnModuleInit {
  private readonly serverAdapter: ExpressAdapter;

  constructor(
    @InjectQueue('payment-logs') private readonly paymentLogsQueue: Queue,
  ) {
    this.serverAdapter = new ExpressAdapter();
    this.serverAdapter.setBasePath('/admin/queues');
  }

  onModuleInit() {
    createBullBoard({
      queues: [
        new BullAdapter(this.paymentLogsQueue, {
          readOnlyMode: false,
        }),
      ],
      serverAdapter: this.serverAdapter,
    });
  }

  getRouter() {
    return this.serverAdapter.getRouter();
  }
}
