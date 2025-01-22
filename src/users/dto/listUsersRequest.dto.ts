import { Transform } from 'class-transformer';

export class ListUsersRequest {
  @Transform(({ value }) => +value)
  limit: number = 10;
  @Transform(({ value }) => +value)
  skip: number = 0;
}
