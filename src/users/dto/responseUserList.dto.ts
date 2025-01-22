import { User } from 'src/schemas/user.schema';
import { UserResponseDto } from './responseUser.dto';

export class UserListResponseDto {
  data: UserResponseDto[];
  limit: number;
  skip: number;
  totalRecords: number;
  totalPages: number;
  constructor(data: User[], limit: number, skip: number, totalRecords: number) {
    this.data = data.map((user) => new UserResponseDto(user));
    this.limit = limit;
    this.skip = skip;
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / this.limit);
  }
}
