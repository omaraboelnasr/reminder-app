import { User } from 'src/schemas/user.schema';

export class UserResponseDto {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.userName = user.userName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
