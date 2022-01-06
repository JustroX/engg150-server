import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public model: Model<UserDocument>) {}

  async createUser(user: User) {
    const doc = await this.model.create(user);
    const saltOrRounds = 10;
    doc.password = await bcrypt.hash(user.password, saltOrRounds);
    await doc.save();
    return doc;
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }
}
