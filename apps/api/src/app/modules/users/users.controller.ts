import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../../../../../users-api/src/app/users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserResponseModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';
import { LoginUserModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user.model';
import { RefreshTokenDto } from '../../../../../auth-api/src/app/dto/refresh-token.dto';
import * as moment from 'moment';
import Response from 'express';

@Controller('users')
export class UsersController {

  constructor(
    @Inject('REDIS') private readonly client: ClientProxy
  ) {
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() user: CreateUserDto): Promise<void> {
    return await this.client.send<void, CreateUserDto>('createUser', user).toPromise();
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() user: LoginUserModel, @Res({passthrough: true}) response: Response): Promise<LoginUserResponseModel> {
    const payload = await this.client.send<LoginUserResponseModel, LoginUserModel>('loginUser', user).toPromise();
    this.setTokenCookie(response, payload.token);
    return payload;
  }

  @Post('refreshToken')
  @HttpCode(200)
  async refreshToken(@Body() data: RefreshTokenDto, @Res({passthrough: true}) response: Response): Promise<LoginUserResponseModel> {
    const payload = await this.client.send<LoginUserResponseModel, RefreshTokenDto>('refreshToken', data).toPromise();
    this.setTokenCookie(response, payload.token);
    return payload;
  }

  private setTokenCookie(res: Response, token: string): void {
    const expires = moment().add(7, 'days').toDate();

    res.cookie('token', token, {
      httpOnly: true,
      expires
    });
  }

}
