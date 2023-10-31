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
var QueueProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let QueueProcessor = QueueProcessor_1 = class QueueProcessor {
    constructor() {
        this.logger = new common_1.Logger(QueueProcessor_1.name);
    }
    async handleAddJob(job) {
        try {
            const { id } = job.data;
            this.logger.debug(`Processing job with ID: ${id}`);
        }
        catch (error) {
            const { id } = job.data;
            this.logger.error(`Failed to process job with ID: ${id}`);
            this.logger.error(error.message, error.stack);
            throw error;
        }
    }
};
exports.QueueProcessor = QueueProcessor;
__decorate([
    (0, bull_1.Process)('job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueProcessor.prototype, "handleAddJob", null);
exports.QueueProcessor = QueueProcessor = QueueProcessor_1 = __decorate([
    (0, bull_1.Processor)('queue')
], QueueProcessor);
//# sourceMappingURL=queue.processor.js.map