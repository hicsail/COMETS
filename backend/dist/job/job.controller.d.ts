import { JobService } from './job.service';
import { Job } from './schemas/job.schema';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    getAllJobs(): Promise<Job[]>;
}
