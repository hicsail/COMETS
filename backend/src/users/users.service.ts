import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    const user = new this.userModel(createUserDto);
    console.log(user)
    return user.save();  
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({"email": email})
    return user;
  }

  async find(params: any): Promise<User[]> {
    const user = await this.userModel.find(params);
    if(!user){
      throw new NotFoundException('No user found');
    }
    return user;
  }

  findAll() {
    return this.userModel.find();
  }


  async update(id: string, field: string) {
    try{
      const updated =  this.userModel.findByIdAndUpdate(
        id,
        {$inc: { [field] : 1 }},
        {new: true}
      ).exec()
      return updated
    }catch(error){
      console.error(error)
    }
    
  }

  remove(email: string) {
    try{
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let deletedUser;
      if (regex.test(email)){
        deletedUser = this.userModel.findOneAndDelete({email: email})
        return deletedUser;
      }else{
        throw new Error(`No users associated with ${email}`)
      }
      
    }catch(error){
      console.error(error)
    }
    
  }
}
