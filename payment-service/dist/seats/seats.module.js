"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const seats_controller_1 = require("./seats.controller");
const seats_service_1 = require("./seats.service");
const seat_entity_1 = require("../database/entities/seat.entity");
const logger_module_1 = require("../common/logger/logger.module");
let SeatsModule = class SeatsModule {
};
exports.SeatsModule = SeatsModule;
exports.SeatsModule = SeatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([seat_entity_1.Seat]),
            bull_1.BullModule.registerQueue({
                name: 'payment-logs',
            }),
            logger_module_1.LoggerModule,
        ],
        controllers: [seats_controller_1.SeatsController],
        providers: [seats_service_1.SeatsService],
        exports: [seats_service_1.SeatsService],
    })
], SeatsModule);
//# sourceMappingURL=seats.module.js.map