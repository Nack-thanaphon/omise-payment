"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const seats_service_1 = require("./seats/seats.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('');
    const seatsService = app.get(seats_service_1.SeatsService);
    await seatsService.createSeats();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Payment service is running on: http://localhost:${port}`);
    console.log(`📋 Health check: http://localhost:${port}/api/v1/health`);
    console.log(`💳 Payment API: http://localhost:${port}/api/v1/payments`);
    console.log(`🪑 Seats API: http://localhost:${port}/api/v1/seats`);
    console.log(`🔔 Webhook: http://localhost:${port}/api/payment/webhook`);
    console.log(`📊 Bull Board: http://localhost:${port}/admin/queues`);
}
bootstrap();
//# sourceMappingURL=main.js.map