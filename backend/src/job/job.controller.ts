import { Controller, Body, Get, Post } from '@nestjs/common'
import { JobService } from './job.service'
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto'

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post('create')
    async createJob(@Body()job:CreateJobDto): Promise<Job> {
        return this.jobService.create(job);
    }

    @Get('all')
    async getAllJobs(): Promise<Job[]> {
        return this.jobService.findAll()
    }

    @Get('purge')
    async purge(): Promise<void> {
        return this.jobService.purge()
    }
}