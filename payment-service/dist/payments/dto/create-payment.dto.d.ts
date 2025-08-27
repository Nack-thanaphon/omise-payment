import { PaymentMethod } from '../../database/entities/payment.entity';
export declare class CreatePaymentDto {
    amount: number;
    currency?: string;
    payment_method: PaymentMethod;
    seat_id?: string;
    customer_email?: string;
    description?: string;
}
