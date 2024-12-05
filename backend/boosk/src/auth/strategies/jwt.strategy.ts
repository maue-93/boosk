import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_SCHEME } from '../constants/auth.scheme';
import { ConfigService } from '@nestjs/config';
import { ACCESS_JWT_SERVICE } from '../constants/jwt.service.names';
import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from '../types/jwt.payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(AUTH_SCHEME),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JwtPayloadType) {
    return payload;
  }
}
