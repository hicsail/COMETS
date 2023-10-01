import { Queue } from 'bull';
export declare class QueueController {
    private readonly queue;
    constructor(queue: Queue);
    add(jobId: string): Promise<void>;
}
