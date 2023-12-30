import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { QueueModule } from '../queue/queue.module';

@Module({
    imports: [
        QueueModule,
        MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])
      ],
    controllers: [JobController],
    providers: [JobService],
})

export class JobModule {}