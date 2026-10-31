import { Unsanitized } from '../../../core/types/unsanitized.input';

export type LoginDto = {
  loginOrEmail: string;
  password: string;
};

export type LoginInput = Unsanitized<LoginDto>;
