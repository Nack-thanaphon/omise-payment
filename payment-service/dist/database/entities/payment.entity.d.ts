import { Seat } from './seat.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    CARD = "card",
    QR_CODE = "qr_code",
    BANK_TRANSFER = "bank_transfer",
    WECHAT_PAY = "wechat_pay"
}
export declare class Payment {
    id: string;
    omise_charge_id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    payment_method: PaymentMethod;
    customer_email: string;
    description: string;
    metadata: any;
    seat_id: string;
    seat: Seat;
    created_at: Date;
    updated_at: Date;
}
