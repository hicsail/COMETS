"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const bull_1 = require("@nestjs/bull");
const nestjs_1 = require("@bull-board/nestjs");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const common_1 = require("@nestjs/common");
let QueueModule = class QueueModule {
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'queue',
            }),
            nestjs_1.BullBoardModule.forFeature({
                name: 'queue',
                adapter: bullAdapter_1.BullAdapter,
            })
        ],
        exports: [bull_1.BullModule]
    })
], QueueModule);
//# sourceMappingURL=queue.module.js.map