import { bcryptService } from '../adapters/bcrypt.service';
import { usersRepository } from '../../users/repositories/users.repository';
import {
  Result,
  successResult,
  unauthorizedResult,
} from '../../core/result/result';
import { jwtService } from '../adapters/jwt.service';
import { User } from '../../users/domain/user';
import { WithId } from 'mongodb';

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<{ accessToken: string }>> {
    const user = await this.checkUserCredentials(loginOrEmail, password);

    if (!user) {
      return unauthorizedResult('Invalid credentials');
    }

    const accessToken = await jwtService.createToken(user._id.toString());

    if (!accessToken) {
      return unauthorizedResult('Invalid settings');
    }

    return successResult({ accessToken });
  },

  async checkUserCredentials(
    loginOrEmail: string,
    password: string,
  ): Promise<WithId<User> | null> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    const isPassCorrect = await bcryptService.checkPassword(
      password,
      user.passwordHash,
    );

    if (!isPassCorrect) return null;

    return user;
  },
};
