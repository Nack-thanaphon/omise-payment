import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../database/entities/payment.entity';
import { Seat } from '../database/entities/seat.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private paymentRepository;
    private seatRepository;
    private loggerService;
    private omiseClient;
    constructor(paymentRepository: Repository<Payment>, seatRepository: Repository<Seat>, loggerService: LoggerService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    getPayment(id: string): Promise<Payment>;
    getPayments(): Promise<Payment[]>;
    updatePaymentStatus(omiseChargeId: string, status: PaymentStatus): Promise<Payment>;
}
