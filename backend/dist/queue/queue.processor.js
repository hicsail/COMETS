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
exports.QueueProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const axios_1 = require("axios");
let QueueProcessor = class QueueProcessor {
    async run(job) {
        try {
            const response = await axios_1.default.get('http://127.0.0.1:5000/run', {
                params: job.data,
                responseType: 'arraybuffer'
            });
            const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
            return `data:image/jpeg;base64,${imageBase64}`;
        }
        catch (error) {
            console.error('Error occurred while making GET request:', error);
            throw error;
        }
    }
};
exports.QueueProcessor = QueueProcessor;
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueProcessor.prototype, "run", null);
exports.QueueProcessor = QueueProcessor = __decorate([
    (0, bull_1.Processor)('queue')
], QueueProcessor);
//# sourceMappingURL=queue.processor.js.map