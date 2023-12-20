import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from "@bull-board/nestjs";
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
    BullBoardModule.forFeature({
      name: 'queue',
      adapter: BullAdapter, 
    }),
  providers: [QueueProcessor],
  controllers: [QueueController]
})
export class QueueModule {}
