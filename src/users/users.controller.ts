import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ListUsersRequest } from './dto/listUsersRequest.dto';
import { UserListResponseDto } from './dto/responseUserList.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserResponseDto } from './dto/responseUpdateUser.dto';
import { DeleteUserResponseDto } from './dto/responseDeleteUser.dto';

@Controller('user')
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

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req: any): Promise<UserResponseDto> {
    const id = req.user.userId;
    const user = await this.userService.getUser(id);
    return new UserResponseDto(user);
  }

  @Patch('/')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const id = req.user.userId;
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Request() req: any): Promise<DeleteUserResponseDto> {
    const id = req.user.userId;
    return this.userService.deleteUser(id);
  }
}
