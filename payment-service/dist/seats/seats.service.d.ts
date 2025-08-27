import { Repository } from 'typeorm';
import { Seat } from '../database/entities/seat.entity';
import { LoggerService } from '../common/logger/logger.service';
import { ReserveSeatDto } from './dto/reserve-seat.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
export declare class SeatsService {
    private seatRepository;
    private loggerService;
    constructor(seatRepository: Repository<Seat>, loggerService: LoggerService);
    getSeats(): Promise<Seat[]>;
    getSeat(id: string): Promise<Seat>;
    reserveSeat(reserveSeatDto: ReserveSeatDto): Promise<Seat>;
    cancelReservation(cancelReservationDto: CancelReservationDto): Promise<Seat>;
    createSeats(): Promise<void>;
}
