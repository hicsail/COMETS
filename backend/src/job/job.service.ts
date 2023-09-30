import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/job.dto';

@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

    async create(createJobDto: CreateJobDto) : Promise<Job> {
        const createdJob = new this.jobModel(createJobDto);
        return createdJob.save();
    }

    async findAll(): Promise<Job[]> {
        const jobs = await this.jobModel.find();
        return jobs;
    }


}