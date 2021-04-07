import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../../dto/login-user.dto';
import * as moment from 'moment';
import { TokenPayloadModel } from '../../../../../../libs/api-interfaces/src/lib/user/token-payload.model';
import { LoginUserResponseModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';
import { RefreshTokenPayloadModel } from '../../../../../../libs/api-interfaces/src/lib/user/refresh-token-payload.model';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { refreshSecret } from '../../settings';
import { UserDocument } from '../../../../../users-api/src/app/users/schemas/user.schema';

@Injectable()
export class AuthService {

  constructor(
    @Inject('REDIS') private readonly client: ClientProxy,
    private jwtService: JwtService
  ) {
  }

  async loginUser(credentials: LoginUserDto): Promise<LoginUserResponseModel> {
    const user: UserDocument = await this.validateCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('User does not exists');
    }

    if (!await this.verifyPassword(credentials.password, user)) {
      throw new UnauthorizedException('User does not exists');
    }

    const token = await this.getToken(user);
    const refresh = await this.getRefreshToken(user, credentials.rememberUser);

    return {
      token,
      refresh
    }
  }

  async refreshToken(token: string): Promise<LoginUserResponseModel> {
    const tokenParsed: RefreshTokenPayloadModel = this.jwtService.decode(token) as RefreshTokenPayloadModel;
    const user = await this.client.send<UserDocument, string>('findOneUserById', tokenParsed.id).toPromise();

    const newToken = await this.getToken(user);
    const refresh = await this.getRefreshToken(user, tokenParsed.rememberUser);

    return {
      token: newToken,
      refresh
    }
  }

  private async validateCredentials ({loginOrEmail}: LoginUserDto): Promise<UserDocument | null> {
    return this.client.send<UserDocument, string>('findOneUser', loginOrEmail).toPromise();
  }

  private async verifyPassword(password: string, user: UserDocument): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }

  private async getToken(user: UserDocument): Promise<string> {
    const payload: TokenPayloadModel  = {login: user.login, id: user._id}
    return await this.jwtService.signAsync(payload);
  }

  private async getRefreshToken(user: UserDocument, rememberUser: boolean): Promise<string> {
    const payload: RefreshTokenPayloadModel = {id: user._id, rememberUser}
    return await this.jwtService.signAsync(payload, {secret: refreshSecret, expiresIn: rememberUser? '48h': '1h'});
  }

}
