import { Controller, Delete, Get, HttpCode, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetRoomDto } from '../../../../../room-api/src/app/room/dto/get-room.dto';
import { CreateRoomDto } from '../../../../../room-api/src/app/room/dto/create-room.dto';
import { JwtAuthGuard } from '../../auth-strategy/jwt-auth-guard';

@Controller('room')
export class RoomController {

  constructor(
    @Inject('REDIS') private readonly client: ClientProxy
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(200)
  async create(): Promise<GetRoomDto> {
    return await this.client.send<GetRoomDto, CreateRoomDto>('createRoom', {userId: '606ddc98ddb1b26b5498a233'}).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findOne/:id')
  @HttpCode(200)
  async findOne(@Param() id: string): Promise<GetRoomDto> {
    return await this.client.send<GetRoomDto, string>('findOneRoom', id).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findUserRooms')
  @HttpCode(200)
  async findUserRooms(): Promise<GetRoomDto[]> {
    return await this.client.send<GetRoomDto[], CreateRoomDto>('createRoom', {userId: '606ddc98ddb1b26b5498a233'}).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('removeRoom/:id')
  @HttpCode(200)
  async remove(@Param() id: string): Promise<void> {
    return await this.client.send<void, string>('removeRoom', id).toPromise();
  }

}
