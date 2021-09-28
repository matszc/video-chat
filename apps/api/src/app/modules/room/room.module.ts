import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environment } from '../../../environments/environment';

@Module({
  imports: [
    ClientsModule.register(([{
      name: 'REDIS',
      transport: Transport.REDIS,
      options: {
        url: environment.redisUrl,
      }
    }]))
  ],
  controllers: [RoomController]
})
export class RoomModule {}
