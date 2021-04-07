import { Controller } from '@nestjs/common';
import { LoginUserModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user.model';
import { RefreshTokenDto } from '../../dto/refresh-token.dto';
import { AuthService } from '../../services/auth/auth.service';
import { LoginUserResponseModel } from '../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }


  @MessagePattern('loginUser')
  async loginUser(@Payload() user: LoginUserModel): Promise<LoginUserResponseModel> {
    return await this.authService.loginUser(user);
  }

  @MessagePattern('refreshToken')
  async refreshToken(@Payload() {refreshToken}: RefreshTokenDto): Promise<LoginUserResponseModel> {
    return await this.authService.refreshToken(refreshToken);
  }

}
