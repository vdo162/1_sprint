import { Unsanitized } from '../../../core/types/unsanitized.input';

export type UserDto = {
  login: string;
  password: string;
  email: string;
};

export type UserInput = Unsanitized<UserDto>;
