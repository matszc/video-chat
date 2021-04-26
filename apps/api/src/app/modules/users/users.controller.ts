import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../../../../../users-api/src/app/users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserResponseModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';
import { LoginUserModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user.model';
import { RefreshTokenDto } from '../../../../../auth-api/src/app/dto/refresh-token.dto';
import * as moment from 'moment';
import { Response, Request } from 'express';
import { environment } from '../../../environments/environment';

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
  async loginUser(@Body() user: LoginUserModel, @Res({ passthrough: true }) response: Response): Promise<LoginUserResponseModel> {
    const payload = await this.client.send<LoginUserResponseModel, LoginUserModel>('loginUser', user).toPromise();
    this.setTokenCookie(response, payload.token, 'token');
    this.setTokenCookie(response, payload.refresh, 'refreshToken');

    return payload;
  }

  @Get('tryRefreshToken')
  @HttpCode(200)
  async refreshToken(@Body() data: RefreshTokenDto, @Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<LoginUserResponseModel> {
    const {token, refresh} = await this.client.send<LoginUserResponseModel, RefreshTokenDto>('refreshToken',
      {refreshToken: request.cookies.refreshToken}).toPromise();

    if(token && refresh) {
      this.setTokenCookie(response, token, 'token');
      this.setTokenCookie(response, refresh, 'refreshToken');
    }
    return {refresh, token};
  }

  @Get('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('Authorization');
    response.clearCookie('refreshToken');
  }

  private setTokenCookie(res: Response, token: string, name: string): void {
    const expires = moment().add(7, 'days').toDate();

    res.cookie(name, token, {
      httpOnly: true,
      expires,
    });
  }

}
