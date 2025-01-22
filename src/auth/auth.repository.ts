import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterParams } from './types';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(user: RegisterParams) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getUserByEmailOrphoneNumber(registerParams: RegisterParams) {
    return await this.userModel.findOne({
      $or: [
        { email: registerParams.email },
        { phoneNumber: registerParams.phoneNumber },
      ],
    });
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).lean();
  }
}
