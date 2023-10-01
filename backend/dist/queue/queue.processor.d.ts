import { Job as BullJob } from 'bull';
export declare class QueueProcessor {
    private readonly logger;
    handleAddJob(job: BullJob<{
        id: string;
    }>): Promise<void>;
}
