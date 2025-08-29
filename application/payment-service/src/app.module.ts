import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { SeatsModule } from './seats/seats.module';
import { WebhookModule } from './webhook/webhook.module';
import { QueueModule } from './queue/queue.module';
import { LoggerModule } from './common/logger/logger.module';
import { BullBoardModule } from './bull-board/bull-board.module';
import { Payment } from './database/entities/payment.entity';
import { PaymentLog } from './database/entities/payment-log.entity';
import { Seat } from './database/entities/seat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'payment_service',
      entities: [Payment, PaymentLog, Seat],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    PaymentsModule,
    SeatsModule,
    WebhookModule,
    QueueModule,
    LoggerModule,
    BullBoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
