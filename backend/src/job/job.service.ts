import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

    async create(createJobDto: CreateJobDto) : Promise<Job> {
        // TODO: handle not creating duplicate jobs
        const res = await this.jobModel.create(createJobDto);

        // add job to queue


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