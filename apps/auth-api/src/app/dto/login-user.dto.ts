import { IsBoolean } from 'class-validator';
import { LoginUserModel } from '../../../../../libs/api-interfaces/src/lib/user/login-user.model';

export class LoginUserDto implements LoginUserModel {

  loginOrEmail: string;

  password: string;

  @IsBoolean()
  rememberUser: boolean;

}
