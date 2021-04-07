import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { PasswordHashInterface } from './interfaces/password-hash.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hash = await this.hashPassword(createUserDto.password);

    const userCreated = new this.userModel({
      ...createUserDto,
      password: hash.hash,
      salt: hash.salt
    });
    return userCreated.save();
  }

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find(() => true).exec();

    return users;
  }

  async findOne(search?: string): Promise<UserDocument> {
    const u1 = await this.userModel.findOne({email: search}).exec();
    if(u1 !== null) {
      return u1;
    }

    return await this.userModel.findOne({login: search}).exec();
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async update(search: string): Promise<void> {
    throw new NotImplementedException();
  }

  async remove(id: string): Promise<void> {
    throw new NotImplementedException();
  }

  private async hashPassword(password: string): Promise<PasswordHashInterface> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return {
      hash,
      salt
    }

  }
}
