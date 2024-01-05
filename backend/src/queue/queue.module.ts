import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from "@bull-board/nestjs";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
    }),
    BullBoardModule.forFeature({
      name: 'queue',
      adapter: BullAdapter, 
    }) 
  ],
  exports: [BullModule]
})
export class QueueModule {}
