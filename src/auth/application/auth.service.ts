import { bcryptService } from '../adapters/bcrypt.service';
import { usersRepository } from '../../users/repositories/users.repository';
import {
  Result,
  successResult,
  unauthorizedResult,
} from '../../core/result/result';

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<{ accessToken: string }>> {
    const isCorrectCredentials = await this.checkUserCredentials(
      loginOrEmail,
      password,
    );

    if (!isCorrectCredentials) {
      return unauthorizedResult('Invalid credentials');
    }

    return successResult({ accessToken: 'token' });
  },

  async checkUserCredentials(
    loginOrEmail: string,
    password: string,
  ): Promise<boolean> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;

    return bcryptService.checkPassword(password, user.passwordHash);
  },
};
