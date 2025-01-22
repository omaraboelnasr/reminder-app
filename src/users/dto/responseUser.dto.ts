import { User } from 'src/schemas/user.schema';

export class UserResponseDto {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;

  constructor(user: User) {
    this._id = user._id.toString();
    this.userName = user.userName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
  }
}
