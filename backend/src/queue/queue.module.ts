import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueProcessor } from './queue.processor';
import { QueueController } from './queue.controller';
import { JobModule } from '../job/job.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
    }),
    JobModule],
  providers: [QueueProcessor],
  controllers: [QueueController]
})
export class QueueModule {}
