import { Controller, Get } from '@nestjs/common'
import { JobService } from './job.service'
import { Job } from './schemas/job.schema'

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Get()
    async getAllJobs(): Promise<Job[]> {
        return this.jobService.findAll()
    }
}