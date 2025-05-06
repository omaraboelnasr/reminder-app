import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { RegisterParams } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async register(user: RegisterParams) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getUserByEmailOrphoneNumber(registerParams: RegisterParams) {
    const { email, phoneNumber } = registerParams;
    return this.userRepository.query(
      'SELECT * FROM "user" WHERE "email"= $1 OR "phoneNumber"= $2',
      [email, phoneNumber],
    );
    // return this.userRepository.findOne({
    //   where: [
    //     { email: registerParams.email },
    //     { phoneNumber: registerParams.phoneNumber },
    //   ],
    // });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.query('SELECT * FROM "user" WHERE email= $1', [
      email,
    ]);
    //   return this.userRepository.findOne({
    //     where: { email },
    //   });
    // }
  }
}
