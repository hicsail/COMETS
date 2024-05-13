import { Controller, Body, Get, Post, Req, Patch, Query, Param } from '@nestjs/common'
import { JobService } from './job.service'
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto';
import { Request } from 'express';

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post('create')
    async createJob(@Body()job:CreateJobDto, @Req()req: Request): Promise<Job> {
        // console.log(`[Controller Request] ${JSON.stringify(req.headers)}`);
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

    @Patch('/:id')
    async update(@Body() updateBody: UpdateJobDto ): Promise<Job> {
        return this.jobService.update(updateBody)
    }
}