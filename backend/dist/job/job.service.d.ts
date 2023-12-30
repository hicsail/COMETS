import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { Queue } from 'bull';
export declare class JobService {
    private jobModel;
    private queue;
    constructor(jobModel: Model<Job>, queue: Queue);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    purge(): Promise<void>;
}
