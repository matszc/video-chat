import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/room/room.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from '../../../auth-api/src/app/settings';
import { JwtStrategyService } from './auth-strategy/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    RoomModule,
    PassportModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyService]
})
export class AppModule {
}
