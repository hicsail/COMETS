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
exports.DispatcherService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const axios_1 = require("axios");
let DispatcherService = class DispatcherService {
    constructor(queue) {
        this.queue = queue;
        this.serverStatus = true;
        this.initializeQueueListener();
    }
    initializeQueueListener() {
        this.queue.on('waiting', async () => {
            const jobCounts = await this.queue.getJobCounts();
            const jobsWaiting = jobCounts.waiting;
            if (this.serverStatus == true && jobsWaiting > 0) {
                await this.dispatch();
            }
        });
    }
    async dispatch() {
        const job = await this.queue.getNextJob();
        if (job) {
            try {
                this.serverStatus = false;
                const response = await axios_1.default.get('http://localhost:5000/process');
                await job.moveToCompleted('done', true);
                this.serverStatus = true;
            }
            catch (error) {
                console.error('Error disptaching job:', error);
                await job.moveToFailed({ message: error.message });
            }
        }
        else {
            console.log('No jobs in the queue!');
        }
    }
};
exports.DispatcherService = DispatcherService;
exports.DispatcherService = DispatcherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('queue')),
    __metadata("design:paramtypes", [Object])
], DispatcherService);
//# sourceMappingURL=dispatcher.service.js.map