import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  private hidePassword(doc: UserDocument) {
    const userObj = doc.toObject();
    userObj.password = '';
    delete userObj.password;
    return userObj;
  }

  @Post()
  async register(@Body() user: User) {
    const doc = await this.user.createUser(user);
    return this.hidePassword(doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  async getSelf(@Req() req) {
    const user = await this.user.findOne(req.user.userID);
    if (!user) throw new NotFoundException('User not found.');
    return this.hidePassword(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.user.findOne(id == 'self' ? req.user.userID : id);
    if (!user) throw new NotFoundException('User not found.');
    return this.hidePassword(user);
  }
}
