import { Inject, Injectable } from '@nestjs/common';
import { CreateCometsRequestDto } from './dto/create-comets_request.dto';
import { UpdateCometsRequestDto } from './dto/update-comets_request.dto';
import { CometsRequest, CometsRequestDocument } from 'src/schemas/requests.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CometsRequestsService {
  constructor(
    @InjectModel('CometsRequest') private cometsRequestModel: Model<CometsRequestDocument>,
    private readonly userService: UsersService
    ){}

  async create(createCometsRequestDto: CreateCometsRequestDto): Promise<CometsRequest>{
    try{
      // Look up user by email and attach to createccometsdto
      let user = await this.userService.findByEmail(String(createCometsRequestDto.email))
      
      if(user === null){
        const userDto: CreateUserDto = {
          email: String(createCometsRequestDto.email)
        }
        user = await this.userService.create(userDto)
      }
      const req_data = {
        "global_params": createCometsRequestDto.global_params,
        "layout": createCometsRequestDto.layout,
        "media": createCometsRequestDto.media,
        "requester": user
        //add a requestComplete: Boolean
      }
      const c_request = new this.cometsRequestModel(req_data);
      /*
        Send to queue
      */
      return c_request.save();
    }catch(err){
      console.error(err);
    }
  }

  findAll() {
    const all_requests = this.cometsRequestModel.find()
    return all_requests;
  }

  async findUser(email: string): Promise<User>{
    const user = await this.userService.findByEmail(String(email));
    return user;
  }

  update(id: number, updateCometsRequestDto: UpdateCometsRequestDto) {
    return `This action updates a #${id} cometsRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} cometsRequest`;
  }
}
