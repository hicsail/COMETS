import { Module } from '@nestjs/common';
import { CometsRequestsService } from './comets_requests.service';
import { CometsRequestsController } from './comets_requests.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CometsRequest, CometsRequestSchema } from 'src/schemas/requests.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CometsRequest.name, schema: CometsRequestSchema }]),
    UsersModule
  ],
  controllers: [CometsRequestsController],
  providers: [CometsRequestsService],
})
export class CometsRequestsModule {}
