"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullBoardModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const bull_board_controller_1 = require("./bull-board.controller");
const bull_board_service_1 = require("./bull-board.service");
let BullBoardModule = class BullBoardModule {
};
exports.BullBoardModule = BullBoardModule;
exports.BullBoardModule = BullBoardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'payment-logs',
            }),
        ],
        controllers: [bull_board_controller_1.BullBoardController],
        providers: [bull_board_service_1.BullBoardService],
        exports: [bull_board_service_1.BullBoardService],
    })
], BullBoardModule);
//# sourceMappingURL=bull-board.module.js.map