"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("../payments/payments.service");
const logger_service_1 = require("../common/logger/logger.service");
const payment_entity_1 = require("../database/entities/payment.entity");
const crypto = require("crypto");
let WebhookService = class WebhookService {
    constructor(paymentsService, loggerService) {
        this.paymentsService = paymentsService;
        this.loggerService = loggerService;
    }
    async handleOmiseWebhook(body, headers, rawBody) {
        try {
            const signature = headers['x-omise-signature'];
            if (signature && process.env.OMISE_WEBHOOK_SECRET) {
                const expectedSignature = crypto
                    .createHmac('sha256', process.env.OMISE_WEBHOOK_SECRET)
                    .update(rawBody)
                    .digest('hex');
                if (signature !== expectedSignature) {
                    await this.loggerService.logPayment('warn', 'Invalid webhook signature', { signature, expected: expectedSignature }, null, null, 'webhook_verification', 'failed');
                    throw new Error('Invalid webhook signature');
                }
            }
            const { key: eventType, data } = body;
            const charge = data;
            await this.loggerService.logPayment('info', `Webhook received: ${eventType}`, { event: body }, null, charge.id, 'webhook_received', eventType);
            let newStatus;
            switch (eventType) {
                case 'charge.complete':
                    newStatus = payment_entity_1.PaymentStatus.PAID;
                    break;
                case 'charge.failed':
                    newStatus = payment_entity_1.PaymentStatus.FAILED;
                    break;
                case 'charge.pending':
                    newStatus = payment_entity_1.PaymentStatus.PENDING;
                    break;
                case 'charge.reversed':
                    newStatus = payment_entity_1.PaymentStatus.REFUNDED;
                    break;
                default:
                    await this.loggerService.logPayment('warn', `Unhandled webhook event: ${eventType}`, { event: body }, null, charge.id, 'webhook_unhandled', eventType);
                    return { status: 'ignored' };
            }
            await this.paymentsService.updatePaymentStatus(charge.id, newStatus);
            return { status: 'success' };
        }
        catch (error) {
            await this.loggerService.logPayment('error', 'Webhook processing failed', { error: error.message, body }, null, null, 'webhook_error', 'failed');
            throw error;
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        logger_service_1.LoggerService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map