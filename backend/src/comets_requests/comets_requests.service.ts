import { Inject, Injectable } from '@nestjs/common';
import { CreateCometsRequestDto } from './dto/create-comets_request.dto';
import { UpdateCometsRequestDto } from './dto/update-comets_request.dto';
import { CometsRequest, CometsRequestDocument } from 'src/schemas/requests.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class CometsRequestsService {
  constructor(
    @InjectModel('CometsRequest') private cometsRequestModel: Model<CometsRequestDocument>,
    private readonly userService: UsersService
    ){}

  async create(createCometsRequestDto: CreateCometsRequestDto): Promise<CometsRequest>{

    // Look up user by email and attach to createccometsdto
    const user = await this.userService.findByEmail(String(createCometsRequestDto.email))
    console.log(user)
    // need to have a case where a new email is given and creates a new user 
    const req_data = {
      "global_params": createCometsRequestDto.global_params,
      "layout": createCometsRequestDto.layout,
      "media": createCometsRequestDto.media,
      "requester": user
    }
    const c_request = new this.cometsRequestModel(req_data);
    return c_request.save();
  }

  findAll() {
    const all_requests = this.cometsRequestModel.find()
    return all_requests;
  }

  findUser(email: string): Promise<User>{

    const user = this.userService.findByEmail(String(email));
    console.log(typeof(String(email)))
    return user;
  }

  update(id: number, updateCometsRequestDto: UpdateCometsRequestDto) {
    return `This action updates a #${id} cometsRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} cometsRequest`;
  }
}
