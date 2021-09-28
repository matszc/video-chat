import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomDto } from './dto/get-room.dto';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @MessagePattern('createRoom')
  async create(@Payload() createRoomDto: CreateRoomDto): Promise<GetRoomDto> {
    return await this.roomService.create(createRoomDto);
  }

  @MessagePattern('findAllRoom')
  async findAll(@Payload() userId: string): Promise<GetRoomDto[]> {
    return await this.roomService.findAll(userId);
  }

  @MessagePattern('findOneRoom')
  async findOne(@Payload() id: string): Promise<GetRoomDto> {
    return await this.roomService.findOne(id);
  }

/*
  @MessagePattern('updateRoom')
  async update(@Payload() updateRoomDto: UpdateRoomDto) {
    return await this.roomService.update(updateRoomDto.id, updateRoomDto);
  }
*/

  @MessagePattern('removeRoom')
  async remove(@Payload() id: string): Promise<void> {
    return await this.roomService.remove(id);
  }
}
