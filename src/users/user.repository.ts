import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UpdateUserParams } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(limit: number, skip: number) {
    const users = await this.userRepository.query(
      `SELECT * FROM "user" ORDER BY "createdAt" DESC LIMIT $1 OFFSET $2`,
      [limit, skip],
    );

    const totalResult = await this.userRepository.query(
      `SELECT COUNT(*) FROM "user"`,
    );

    const total = parseInt(totalResult[0].count, 10);

    return { users, total };
    // const [users, total] = await this.userRepository.findAndCount({
    //   skip,
    //   take: limit,
    // });
    // return { users, total };
  }

  async getUser(id: string) {
    return await this.userRepository.query(
      `SELECT * FROM "user" WHERE id= $1`,
      [id],
    );
    // return this.userRepository.findOne({
    //   where: { id },
    // });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.query('SELECT * FROM "user" WHERE email= $1', [
      email,
    ]);
    // return this.userRepository.findOne({
    //   where: { email },
    // });
  }
  async updateUser(id: string, user: UpdateUserParams) {
    await this.userRepository.update(id, user);
    return this.getUser(id);
  }

  async deleteUser(id: string) {
    return this.userRepository.query(`DELETE FROM "user" WHERE "id"= $1`, [id]);
    // return this.userRepository.delete(id);
  }
}
