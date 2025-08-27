import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<import("../database/entities/payment.entity").Payment>;
    getPayment(id: string): Promise<import("../database/entities/payment.entity").Payment>;
    getPayments(): Promise<import("../database/entities/payment.entity").Payment[]>;
}
