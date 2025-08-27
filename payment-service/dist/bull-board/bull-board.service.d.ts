import { OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
export declare class BullBoardService implements OnModuleInit {
    private readonly paymentLogsQueue;
    private readonly serverAdapter;
    constructor(paymentLogsQueue: Queue);
    onModuleInit(): void;
    getRouter(): any;
}
