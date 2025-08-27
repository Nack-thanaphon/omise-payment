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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const bull_1 = require("@nestjs/bull");
let LoggerService = class LoggerService {
    constructor(paymentLogsQueue) {
        this.paymentLogsQueue = paymentLogsQueue;
        this.logger = (0, winston_1.createLogger)({
            level: process.env.LOG_LEVEL || 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                new winston_1.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston_1.transports.File({
                    filename: 'logs/combined.log',
                }),
            ],
        });
    }
    async logPayment(level, message, metadata, paymentId, omiseChargeId, action, status) {
        const logData = {
            level,
            message,
            metadata,
            payment_id: paymentId,
            omise_charge_id: omiseChargeId,
            action,
            status,
            timestamp: new Date().toISOString(),
        };
        this.logger.log(level, message, logData);
        await this.paymentLogsQueue.add('store-log', logData, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000,
            },
        });
    }
    info(message, metadata) {
        this.logger.info(message, metadata);
    }
    error(message, error, metadata) {
        this.logger.error(message, { error: error?.stack, ...metadata });
    }
    warn(message, metadata) {
        this.logger.warn(message, metadata);
    }
    debug(message, metadata) {
        this.logger.debug(message, metadata);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('payment-logs')),
    __metadata("design:paramtypes", [Object])
], LoggerService);
//# sourceMappingURL=logger.service.js.map