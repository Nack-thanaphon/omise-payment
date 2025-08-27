import { Job } from 'bull';
import { Repository } from 'typeorm';
import { PaymentLog } from '../database/entities/payment-log.entity';
export declare class QueueProcessor {
    private paymentLogRepository;
    constructor(paymentLogRepository: Repository<PaymentLog>);
    handleStoreLog(job: Job): Promise<void>;
}
