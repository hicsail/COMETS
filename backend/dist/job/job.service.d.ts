import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/job.dto';
export declare class JobService {
    private jobModel;
    constructor(jobModel: Model<Job>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
}
