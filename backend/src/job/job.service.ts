import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Injectable()
export class JobService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<Job>,
        // @InjectQueue('queue') private queue: Queue
    ) {}

    async create(createJobDto: CreateJobDto) : Promise<Job> {
        /*
         Projections: Check for duplicate jobs
         Implemented in next round
         */
        const res = await this.jobModel.create(createJobDto);
        
        /*
        // used to push into queue, place this into request service
        // await this.queue.add('job', createJobDto);
         */
        return res;
    }

    async findAll(): Promise<Job[]> {
        const jobs = await this.jobModel.find();
        return jobs;
    }

    async purge(): Promise<void> {
        await this.jobModel.deleteMany({});
    }

}