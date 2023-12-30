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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherController = void 0;
const common_1 = require("@nestjs/common");
const dispatcher_service_1 = require("./dispatcher.service");
let DispatcherController = class DispatcherController {
    constructor(dispatcherService) {
        this.dispatcherService = dispatcherService;
    }
    async dispatch() {
        this.dispatcherService.dispatch();
    }
};
exports.DispatcherController = DispatcherController;
__decorate([
    (0, common_1.Get)('dispatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DispatcherController.prototype, "dispatch", null);
exports.DispatcherController = DispatcherController = __decorate([
    (0, common_1.Controller)('dispatcher'),
    __metadata("design:paramtypes", [dispatcher_service_1.DispatcherService])
], DispatcherController);
//# sourceMappingURL=dispatcher.controller.js.map