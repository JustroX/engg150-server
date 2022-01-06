import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public model: Model<UserDocument>) {}

  createUser(user: User) {
    return this.model.create(user);
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }
}
