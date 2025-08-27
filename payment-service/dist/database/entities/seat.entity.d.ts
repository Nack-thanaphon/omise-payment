export declare enum SeatStatus {
    AVAILABLE = "available",
    RESERVED = "reserved",
    OCCUPIED = "occupied",
    MAINTENANCE = "maintenance"
}
export declare class Seat {
    id: string;
    seat_number: string;
    section: string;
    row: string;
    price: number;
    status: SeatStatus;
    metadata: any;
    reserved_until: Date;
    reserved_by: string;
    created_at: Date;
    updated_at: Date;
}
