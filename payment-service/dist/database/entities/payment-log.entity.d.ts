export declare enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}
export declare class PaymentLog {
    id: string;
    level: LogLevel;
    message: string;
    metadata: any;
    payment_id: string;
    omise_charge_id: string;
    action: string;
    status: string;
    created_at: Date;
}
