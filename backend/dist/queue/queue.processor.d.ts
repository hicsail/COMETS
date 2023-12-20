import { Job as BullJob } from 'bull';
import { CreateJobDto } from '../job/dto/create-job.dto';
export declare class QueueProcessor {
    run(job: BullJob<CreateJobDto>): Promise<string>;
}
