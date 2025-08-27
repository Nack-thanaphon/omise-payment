import { PaymentsService } from '../payments/payments.service';
import { LoggerService } from '../common/logger/logger.service';
export declare class WebhookService {
    private paymentsService;
    private loggerService;
    constructor(paymentsService: PaymentsService, loggerService: LoggerService);
    handleOmiseWebhook(body: any, headers: any, rawBody: Buffer): Promise<{
        status: string;
    }>;
}
