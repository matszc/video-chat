import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
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
  controllers: [UsersController]
})
export class UsersModule {}
