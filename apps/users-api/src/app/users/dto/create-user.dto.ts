import { PostUserModel } from '../../../../../../libs/api-interfaces/src/lib/user/post-user.model';
import { IsEmail, IsString, Length } from 'class-validator';
import { UniqueValue } from '../../../../../../libs/vc-common/src/lib/custom-validators/unique-value/unique-value.service';

export class CreateUserDto implements PostUserModel {

  @IsString()
  @Length(5, 20)
 // @UniqueValue('users')
  login: string;

  @IsString()
  @Length(6, 50)
  password: string;

  @IsEmail()
  @UniqueValue('users')
  email: string;
}
