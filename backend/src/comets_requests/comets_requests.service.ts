import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
        "requester": user,
        // "requestSuccessful": false
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
    if(!user){
      console.error(`No user associated with ${email}`)
      throw new NotFoundException(`No user associated with ${email}`)
    }
    return user;
  }

  async update(updateCometsRequestDto: UpdateCometsRequestDto, id:string): Promise<CometsRequest> {
    try{
      const documentUpdates = {
        requestSuccessful: updateCometsRequestDto.jobSuccessful,
        completedJob: updateCometsRequestDto.completedJob
      }
      const request = await this.cometsRequestModel.findByIdAndUpdate(id,documentUpdates)
      if(!request){
        throw new NotFoundException('No document found')
      }
      return request;
    }catch(err){
      throw new Error(err)
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} cometsRequest`;
  }
}
