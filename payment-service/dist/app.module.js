"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const payments_module_1 = require("./payments/payments.module");
const seats_module_1 = require("./seats/seats.module");
const webhook_module_1 = require("./webhook/webhook.module");
const queue_module_1 = require("./queue/queue.module");
const logger_module_1 = require("./common/logger/logger.module");
const bull_board_module_1 = require("./bull-board/bull-board.module");
const payment_entity_1 = require("./database/entities/payment.entity");
const payment_log_entity_1 = require("./database/entities/payment-log.entity");
const seat_entity_1 = require("./database/entities/seat.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'password',
                database: process.env.DB_NAME || 'payment_service',
                entities: [payment_entity_1.Payment, payment_log_entity_1.PaymentLog, seat_entity_1.Seat],
                synchronize: process.env.NODE_ENV !== 'production',
                logging: process.env.NODE_ENV === 'development',
                migrations: ['dist/database/migrations/*.js'],
                migrationsRun: false,
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT) || 6379,
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            payments_module_1.PaymentsModule,
            seats_module_1.SeatsModule,
            webhook_module_1.WebhookModule,
            queue_module_1.QueueModule,
            logger_module_1.LoggerModule,
            bull_board_module_1.BullBoardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map