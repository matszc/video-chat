import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../../../../auth-api/src/app/settings';
import {Request} from 'express';
import { TokenPayloadModel } from '../../../../../libs/api-interfaces/src/lib/user/token-payload.model';

export const tokenGetter = (req: Request): string => {
  if(req && req.cookies) {
    return req['token']
  }
  return null;
}

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: tokenGetter,
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }
}
