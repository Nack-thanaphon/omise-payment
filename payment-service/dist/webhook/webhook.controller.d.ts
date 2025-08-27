import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    handleWebhook(body: any, headers: any, rawBody: Buffer): Promise<{
        status: string;
    }>;
}
