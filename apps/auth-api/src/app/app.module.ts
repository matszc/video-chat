import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controlers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtSecret } from './settings';

@Module({
  imports: [
    ClientsModule.register(([{
      name: 'REDIS',
      transport: Transport.REDIS,
      options: {
        url: environment.redis,
      }
    }])),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '15min' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
