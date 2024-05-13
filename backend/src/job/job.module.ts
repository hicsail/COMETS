import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/schemas/job.schema';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { QueueModule } from '../queue/queue.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        QueueModule,
        MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
        HttpModule
      ],
    controllers: [JobController],
    providers: [JobService],
})

export class JobModule {}