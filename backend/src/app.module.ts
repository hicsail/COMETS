import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/comets'), JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
