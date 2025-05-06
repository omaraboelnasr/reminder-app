import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ListUsersParams, UpdateUserParams } from './types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(params: ListUsersParams) {
    try {
      const safeLimit = Math.min(params.limit, 20);
      const { users, total } = await this.userRepository.getAllUsers(
        safeLimit,
        params.skip,
      );
      return { data: users, limit: safeLimit, skip: params.skip, total };
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.userRepository.getUser(id);
      if (user.length == 0) {
        throw new NotFoundException(`user with id: ${id} not found`);
      }
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: UpdateUserParams) {
    try {
      if (user.password) {
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
      }
      const updatedUser = await this.userRepository.updateUser(id, user);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return { message: 'User Update successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.deleteUser(id);
      if (!user) {
        throw new NotFoundException(`User with ID '${id}' not found`);
      }
      return { message: 'User Delete successfully' };
    } catch (error) {
      throw error;
    }
  }
}
