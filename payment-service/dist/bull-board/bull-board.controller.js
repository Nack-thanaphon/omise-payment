"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullBoardController = void 0;
const common_1 = require("@nestjs/common");
const bull_board_service_1 = require("./bull-board.service");
let BullBoardController = class BullBoardController {
    constructor(bullBoardService) {
        this.bullBoardService = bullBoardService;
    }
    async dashboard(req, res) {
        const router = this.bullBoardService.getRouter();
        router(req, res, () => {
            res.status(404).send('Not Found');
        });
    }
};
exports.BullBoardController = BullBoardController;
__decorate([
    (0, common_1.Get)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BullBoardController.prototype, "dashboard", null);
exports.BullBoardController = BullBoardController = __decorate([
    (0, common_1.Controller)('admin/queues'),
    __metadata("design:paramtypes", [bull_board_service_1.BullBoardService])
], BullBoardController);
//# sourceMappingURL=bull-board.controller.js.map