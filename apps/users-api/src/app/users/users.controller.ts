import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  async findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() search: string): Promise<UserDocument>  {
    return this.usersService.findOne(search);
  }

  @MessagePattern('findOneUserById')
  async findOnById(@Payload() id: string): Promise<UserDocument> {
    return this.usersService.findOneById(id);
  }

  @MessagePattern('updateUser')
  async update(@Payload() updateUserDto: UpdateUserDto): Promise<void> {
    return this.usersService.update(updateUserDto.id);
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
