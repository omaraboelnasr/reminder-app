import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginParams, RegisterParams } from './types';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private AuthRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async register(user: RegisterParams) {
    try {
      const userExist: User =
        await this.AuthRepository.getUserByEmailOrphoneNumber(user);
      if (userExist) {
        throw new BadRequestException(
          'User with this email or phone number already exists',
        );
      }
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(user.password, salt);
      await this.AuthRepository.register({
        ...user,
        password: hashPass,
        userName: user.email.split('@')[0],
      });
      return { message: 'User Create Successfully' };
    } catch (error) {
      throw error;
    }
  }
  async login(loginParams: LoginParams) {
    try {
      const userExist = await this.AuthRepository.getUserByEmail(
        loginParams.email,
      );
      if (!userExist) {
        throw new BadRequestException('invalid email or password');
      }
      const isMatch = await bcrypt.compare(
        loginParams.password,
        userExist.password,
      );
      if (!isMatch) {
        throw new BadRequestException('invalid email or password');
      }
      const payload = {
        email: userExist.email,
        userId: userExist._id,
        userName: userExist.userName,
      };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw error;
    }
  }
}
