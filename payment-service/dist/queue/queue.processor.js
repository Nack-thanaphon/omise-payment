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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_log_entity_1 = require("../database/entities/payment-log.entity");
let QueueProcessor = class QueueProcessor {
    constructor(paymentLogRepository) {
        this.paymentLogRepository = paymentLogRepository;
    }
    async handleStoreLog(job) {
        const { level, message, metadata, payment_id, omise_charge_id, action, status, } = job.data;
        try {
            const paymentLog = this.paymentLogRepository.create({
                level: level,
                message,
                metadata,
                payment_id,
                omise_charge_id,
                action,
                status,
            });
            await this.paymentLogRepository.save(paymentLog);
            console.log(`✅ Log stored successfully: ${message}`);
        }
        catch (error) {
            console.error('❌ Failed to store log:', error);
            throw error;
        }
    }
};
exports.QueueProcessor = QueueProcessor;
__decorate([
    (0, bull_1.Process)('store-log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueProcessor.prototype, "handleStoreLog", null);
exports.QueueProcessor = QueueProcessor = __decorate([
    (0, bull_1.Processor)('payment-logs'),
    __param(0, (0, typeorm_1.InjectRepository)(payment_log_entity_1.PaymentLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QueueProcessor);
//# sourceMappingURL=queue.processor.js.map