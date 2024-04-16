import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CometsRequestsService } from './comets_requests.service';
import { CreateCometsRequestDto } from './dto/create-comets_request.dto';

@Controller('comets-requests')
export class CometsRequestsController {
  constructor(private readonly cometsRequestsService: CometsRequestsService) {}

  @Post()
  async create(@Body() createCometsRequestDto: CreateCometsRequestDto) {
    return this.cometsRequestsService.create(createCometsRequestDto);
  }

  @Get()
  findAll() {
    return this.cometsRequestsService.findAll();
  }

  @Get('/user')
  async findUser(@Query() email: string){
    return this.cometsRequestsService.findUser(email)
  }

}
