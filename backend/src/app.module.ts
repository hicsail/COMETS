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
import { CometsRequestsModule } from './comets_requests/comets_requests.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvVars: false
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri')
      })
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
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
    CometsRequestsModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '../.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
