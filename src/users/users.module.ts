import { Module } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
