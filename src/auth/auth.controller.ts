import { Controller, Delete, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res() res) {
    const { access_token } = this.auth.login(req.user);
    res
      .cookie('access_token', access_token, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: 'strict',
        httpOnly: false,
        secure: false,
      })
      .send();
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res) {
    res.clearCookie('access_token').send();
  }
}
