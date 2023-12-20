import { InjectQueue } from '@nestjs/bull';
import { Controller, Body, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateJobDto } from '../job/dto/create-job.dto'; 

@Controller('queue')
export class QueueController {
    constructor(@InjectQueue('queue') private readonly queue: Queue) {}

    @Post('add')
    async add(
        @Body() jobDto: CreateJobDto 
    ): Promise<void> {
        await this.queue.add('job', jobDto); 
    }
}