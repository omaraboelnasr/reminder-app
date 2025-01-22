import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ListUsersRequest } from './dto/listUsersRequest.dto';
import { UserListResponseDto } from './dto/responseUserList.dto';
import { IdParam } from './dto/idParam.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserResponseDto } from './dto/responseUpdateUser.dto';
import { DeleteUserResponseDto } from './dto/responseDeleteUser.dto';

@Controller('users')
export class UsersController {
  constructor(public userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Query() queryParams: ListUsersRequest,
  ): Promise<UserListResponseDto> {
    const { data, limit, skip, total } =
      await this.userService.getAllUsers(queryParams);
    return new UserListResponseDto(data, limit, skip, total);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param() { id }: IdParam): Promise<UserResponseDto> {
    const user = await this.userService.getUser(id);
    return new UserResponseDto(user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, new OwnershipGuard())
  updateUser(
    @Param() { id }: IdParam,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, new OwnershipGuard())
  deleteUser(@Param() { id }: IdParam): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUser(id);
  }
}
