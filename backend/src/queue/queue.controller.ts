import { InjectQueue } from '@nestjs/bull';
import { Controller, Body, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue')
export class QueueController {
    constructor(@InjectQueue('queue') private readonly queue: Queue) {}

    @Post('add')
    async add(
        @Body('id') jobId: string 
    ): Promise<void> {
        await this.queue.add('job', { id: jobId }); 
    }
}
