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
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seat_entity_1 = require("../database/entities/seat.entity");
const logger_service_1 = require("../common/logger/logger.service");
let SeatsService = class SeatsService {
    constructor(seatRepository, loggerService) {
        this.seatRepository = seatRepository;
        this.loggerService = loggerService;
    }
    async getSeats() {
        return this.seatRepository.find({
            order: { seat_number: 'ASC' },
        });
    }
    async getSeat(id) {
        const seat = await this.seatRepository.findOne({ where: { id } });
        if (!seat) {
            throw new common_1.NotFoundException('Seat not found');
        }
        return seat;
    }
    async reserveSeat(reserveSeatDto) {
        const { seat_id, customer_email, duration_minutes = 15 } = reserveSeatDto;
        const seat = await this.seatRepository.findOne({ where: { id: seat_id } });
        if (!seat) {
            throw new common_1.NotFoundException('Seat not found');
        }
        if (seat.status !== seat_entity_1.SeatStatus.AVAILABLE) {
            throw new common_1.BadRequestException('Seat is not available for reservation');
        }
        seat.status = seat_entity_1.SeatStatus.RESERVED;
        seat.reserved_until = new Date(Date.now() + duration_minutes * 60 * 1000);
        seat.reserved_by = customer_email;
        const updatedSeat = await this.seatRepository.save(seat);
        await this.loggerService.logPayment('info', 'Seat reserved successfully', { seat_id, customer_email, duration_minutes }, null, null, 'reserve_seat', 'reserved');
        return updatedSeat;
    }
    async cancelReservation(cancelReservationDto) {
        const { seat_id, customer_email } = cancelReservationDto;
        const seat = await this.seatRepository.findOne({ where: { id: seat_id } });
        if (!seat) {
            throw new common_1.NotFoundException('Seat not found');
        }
        if (seat.status !== seat_entity_1.SeatStatus.RESERVED) {
            throw new common_1.BadRequestException('Seat is not reserved');
        }
        if (seat.reserved_by !== customer_email) {
            throw new common_1.BadRequestException('You can only cancel your own reservations');
        }
        seat.status = seat_entity_1.SeatStatus.AVAILABLE;
        seat.reserved_until = null;
        seat.reserved_by = null;
        const updatedSeat = await this.seatRepository.save(seat);
        await this.loggerService.logPayment('info', 'Seat reservation cancelled', { seat_id, customer_email }, null, null, 'cancel_reservation', 'cancelled');
        return updatedSeat;
    }
    async createSeats() {
        const count = await this.seatRepository.count();
        if (count === 0) {
            const seats = [];
            for (let i = 1; i <= 50; i++) {
                seats.push(this.seatRepository.create({
                    seat_number: `A${i.toString().padStart(2, '0')}`,
                    section: 'A',
                    row: Math.ceil(i / 10).toString(),
                    price: 100 + (i % 5) * 50,
                    status: seat_entity_1.SeatStatus.AVAILABLE,
                }));
            }
            await this.seatRepository.save(seats);
            console.log('Created 50 sample seats');
        }
    }
};
exports.SeatsService = SeatsService;
exports.SeatsService = SeatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seat_entity_1.Seat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        logger_service_1.LoggerService])
], SeatsService);
//# sourceMappingURL=seats.service.js.map