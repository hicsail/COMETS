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
    ) {}

    async create(createJobDto: CreateJobDto) : Promise<Job> {
        const res = await this.jobModel.create(createJobDto);
        console.log(`http://localhost:5173/results/${res.id}`)
        
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