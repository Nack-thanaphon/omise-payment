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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../database/entities/payment.entity");
const seat_entity_1 = require("../database/entities/seat.entity");
const logger_service_1 = require("../common/logger/logger.service");
const omise = require("omise");
let PaymentsService = class PaymentsService {
    constructor(paymentRepository, seatRepository, loggerService) {
        this.paymentRepository = paymentRepository;
        this.seatRepository = seatRepository;
        this.loggerService = loggerService;
        this.omiseClient = omise({
            publicKey: process.env.OMISE_PUBLIC_KEY,
            secretKey: process.env.OMISE_SECRET_KEY,
        });
    }
    async createPayment(createPaymentDto) {
        const { amount, currency, payment_method, seat_id, customer_email, description, } = createPaymentDto;
        try {
            let seat = null;
            if (seat_id) {
                seat = await this.seatRepository.findOne({ where: { id: seat_id } });
                if (!seat) {
                    throw new common_1.NotFoundException('Seat not found');
                }
                if (seat.status !== seat_entity_1.SeatStatus.AVAILABLE) {
                    throw new Error('Seat is not available');
                }
            }
            const charge = await this.omiseClient.charges.create({
                amount: Math.round(amount * 100),
                currency: currency || 'THB',
                description: description || 'Payment for reservation',
                metadata: {
                    seat_id,
                    customer_email,
                },
            });
            const payment = this.paymentRepository.create({
                omise_charge_id: charge.id,
                amount,
                currency: currency || 'THB',
                status: payment_entity_1.PaymentStatus.PENDING,
                payment_method: payment_method,
                customer_email,
                description,
                seat_id,
                metadata: { omise_charge: charge },
            });
            const savedPayment = await this.paymentRepository.save(payment);
            if (seat) {
                seat.status = seat_entity_1.SeatStatus.RESERVED;
                seat.reserved_until = new Date(Date.now() + 15 * 60 * 1000);
                seat.reserved_by = customer_email;
                await this.seatRepository.save(seat);
            }
            await this.loggerService.logPayment('info', 'Payment created successfully', { payment_id: savedPayment.id, charge_id: charge.id }, savedPayment.id, charge.id, 'create_payment', 'pending');
            return savedPayment;
        }
        catch (error) {
            await this.loggerService.logPayment('error', 'Failed to create payment', { error: error.message, ...createPaymentDto }, null, null, 'create_payment', 'failed');
            throw error;
        }
    }
    async getPayment(id) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['seat'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
    async getPayments() {
        return this.paymentRepository.find({
            relations: ['seat'],
            order: { created_at: 'DESC' },
        });
    }
    async updatePaymentStatus(omiseChargeId, status) {
        const payment = await this.paymentRepository.findOne({
            where: { omise_charge_id: omiseChargeId },
            relations: ['seat'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        payment.status = status;
        const updatedPayment = await this.paymentRepository.save(payment);
        if (payment.seat) {
            if (status === payment_entity_1.PaymentStatus.PAID) {
                payment.seat.status = seat_entity_1.SeatStatus.OCCUPIED;
                payment.seat.reserved_until = null;
            }
            else if (status === payment_entity_1.PaymentStatus.FAILED ||
                status === payment_entity_1.PaymentStatus.CANCELLED) {
                payment.seat.status = seat_entity_1.SeatStatus.AVAILABLE;
                payment.seat.reserved_until = null;
                payment.seat.reserved_by = null;
            }
            await this.seatRepository.save(payment.seat);
        }
        await this.loggerService.logPayment('info', `Payment status updated to ${status}`, { payment_id: payment.id }, payment.id, omiseChargeId, 'update_status', status);
        return updatedPayment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(seat_entity_1.Seat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        logger_service_1.LoggerService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map