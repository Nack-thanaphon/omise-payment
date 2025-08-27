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
exports.SeatsController = void 0;
const common_1 = require("@nestjs/common");
const seats_service_1 = require("./seats.service");
const reserve_seat_dto_1 = require("./dto/reserve-seat.dto");
const cancel_reservation_dto_1 = require("./dto/cancel-reservation.dto");
let SeatsController = class SeatsController {
    constructor(seatsService) {
        this.seatsService = seatsService;
    }
    async getSeats() {
        return this.seatsService.getSeats();
    }
    async getSeat(id) {
        return this.seatsService.getSeat(id);
    }
    async reserveSeat(reserveSeatDto) {
        return this.seatsService.reserveSeat(reserveSeatDto);
    }
    async cancelReservation(cancelReservationDto) {
        return this.seatsService.cancelReservation(cancelReservationDto);
    }
};
exports.SeatsController = SeatsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeatsController.prototype, "getSeats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeatsController.prototype, "getSeat", null);
__decorate([
    (0, common_1.Post)('reserve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reserve_seat_dto_1.ReserveSeatDto]),
    __metadata("design:returntype", Promise)
], SeatsController.prototype, "reserveSeat", null);
__decorate([
    (0, common_1.Post)('cancel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_reservation_dto_1.CancelReservationDto]),
    __metadata("design:returntype", Promise)
], SeatsController.prototype, "cancelReservation", null);
exports.SeatsController = SeatsController = __decorate([
    (0, common_1.Controller)('api/v1/seats'),
    __metadata("design:paramtypes", [seats_service_1.SeatsService])
], SeatsController);
//# sourceMappingURL=seats.controller.js.map