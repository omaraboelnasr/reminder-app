export type ListUsersParams = {
  skip: number;
  limit: number;
};

export type UpdateUserParams = {
  email?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
};
