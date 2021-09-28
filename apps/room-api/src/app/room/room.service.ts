import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { GetRoomDto } from './dto/get-room.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomService {

  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>
  ) {
  }

  async create(createRoomDto: CreateRoomDto): Promise<GetRoomDto> {
    const guid = uuidv4();
    const user = await this.roomModel.create({guid, createdBy: createRoomDto.userId});
    return {
      guid: user.guid,
      createdBy: user.createdBy
    }
  }

  async findAll(userId: string): Promise<GetRoomDto[]> {
    return this.roomModel.find({createdBy: userId}).exec().then(v => {
      return v.map(({createdBy, guid}) => ({createdBy, guid}))
    })
  }

  async findOne(id: string): Promise<GetRoomDto> {
    const room = await this.roomModel.findOne({guid: id}).exec();
    return {
      guid: room.guid,
      createdBy: room.guid
    }
  }
/*
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }*/

  async remove(id: string): Promise<void> {
    await this.roomModel.findOneAndRemove({guid: id}).exec();
  }
}
