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
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import Bull from 'bull';


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_COLLECTION}`), 
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
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
