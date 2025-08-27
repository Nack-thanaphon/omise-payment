import { Request, Response } from 'express';
import { BullBoardService } from './bull-board.service';
export declare class BullBoardController {
    private readonly bullBoardService;
    constructor(bullBoardService: BullBoardService);
    dashboard(req: Request, res: Response): Promise<void>;
}
