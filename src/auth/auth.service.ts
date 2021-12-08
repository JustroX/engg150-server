import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Payload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UserService, private jwtService: JwtService) {}

  async validatePassword(username: string, password: string) {
    const user = await this.users.model.findOne({ username }).exec();
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) return user;
      throw new UnauthorizedException('Invalid password.');
    }
    throw new UnauthorizedException('Invalid username.');
  }

  login(user: UserDocument) {
    const payload: Payload = {
      username: user.username,
      sub: user._id.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
