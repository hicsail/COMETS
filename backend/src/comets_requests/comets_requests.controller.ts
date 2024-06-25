import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CometsRequestsService } from './comets_requests.service';
import { CreateCometsRequestDto } from './dto/create-comets_request.dto';
import { UpdateCometsRequestDto } from './dto/update-comets_request.dto';
import { User } from 'src/schemas/users.schema';

@Controller('comets-request')
export class CometsRequestsController {
  constructor(private readonly cometsRequestsService: CometsRequestsService) {}

  @Post()
  async create(@Body() createCometsRequestDto: any) {
    return this.cometsRequestsService.create(createCometsRequestDto);
  }

  @Get()
  findAll() {
    return this.cometsRequestsService.findAll();
  }

  @Get('/user')
  async findUser(@Query('email') email: string): Promise<User>{
    return await this.cometsRequestsService.findUser(email)
  }

  @Patch('/:id')
  async update(
    @Body() update:UpdateCometsRequestDto,
    @Param('id') id: string
    ){
    return await this.cometsRequestsService.update(update, id)
  }
}
