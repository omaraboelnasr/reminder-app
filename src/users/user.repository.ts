import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserParams } from './types';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(limit: number, skip: number) {
    const total = await this.userModel.countDocuments();
    const users = await this.userModel.find().skip(skip).limit(limit).lean();
    return { users, total };
  }

  async getUser(id: string) {
    return this.userModel.findById(id).lean();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).lean();
  }
  async updateUser(id: string, user: UpdateUserParams) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
