import { PostRefreshTokenModel } from '../../../../../libs/api-interfaces/src/lib/user/post-refresh-token.model';

export class RefreshTokenDto implements PostRefreshTokenModel {
  refreshToken: string
}
