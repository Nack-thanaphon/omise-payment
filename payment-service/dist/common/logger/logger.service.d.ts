import { Queue } from 'bull';
export declare class LoggerService {
    private readonly paymentLogsQueue;
    private readonly logger;
    constructor(paymentLogsQueue: Queue);
    logPayment(level: string, message: string, metadata?: any, paymentId?: string, omiseChargeId?: string, action?: string, status?: string): Promise<void>;
    info(message: string, metadata?: any): void;
    error(message: string, error?: Error, metadata?: any): void;
    warn(message: string, metadata?: any): void;
    debug(message: string, metadata?: any): void;
}
