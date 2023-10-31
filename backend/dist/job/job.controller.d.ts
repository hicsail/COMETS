import { JobService } from './job.service';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    createJob(job: CreateJobDto): Promise<Job>;
    getAllJobs(): Promise<Job[]>;
    purge(): Promise<void>;
}
