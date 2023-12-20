import { Queue } from 'bull';
import { CreateJobDto } from '../job/dto/create-job.dto';
export declare class QueueController {
    private readonly queue;
    constructor(queue: Queue);
    add(jobDto: CreateJobDto): Promise<void>;
}
