import { SeatsService } from './seats.service';
import { ReserveSeatDto } from './dto/reserve-seat.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    getSeats(): Promise<import("../database/entities/seat.entity").Seat[]>;
    getSeat(id: string): Promise<import("../database/entities/seat.entity").Seat>;
    reserveSeat(reserveSeatDto: ReserveSeatDto): Promise<import("../database/entities/seat.entity").Seat>;
    cancelReservation(cancelReservationDto: CancelReservationDto): Promise<import("../database/entities/seat.entity").Seat>;
}
