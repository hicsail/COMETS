import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueModule } from './queue/queue.module';
import { JobModule } from './job/job.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { DispatcherModule } from './dispatcher/dispatcher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/comets'), 
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter 
    }),
    QueueModule,
    JobModule,
    DispatcherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
