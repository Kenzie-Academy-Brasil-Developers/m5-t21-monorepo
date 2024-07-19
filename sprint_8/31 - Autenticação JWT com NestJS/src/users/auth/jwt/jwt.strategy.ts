import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayloadDto } from './jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Nesse método eu escolho o que terá no req.user de rotas protegidas
  async validate(jwtPayload): Promise<JwtPayloadDto> {
    // console.log('JwtStrategy executado:', { jwtPayload });
    return { userId: jwtPayload.sub, email: jwtPayload.email };
  }
}
