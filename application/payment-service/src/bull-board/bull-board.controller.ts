import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BullBoardService } from './bull-board.service';

@Controller('admin/queues')
export class BullBoardController {
  constructor(private readonly bullBoardService: BullBoardService) {}

  @Get('*')
  async dashboard(@Req() req: Request, @Res() res: Response) {
    const router = this.bullBoardService.getRouter();
    router(req, res, () => {
      res.status(404).send('Not Found');
    });
  }
}
