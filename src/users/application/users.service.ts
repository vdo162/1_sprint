import { usersRepository } from '../repositories/users.repository';
import { User } from '../domain/user';
import { UserDto } from '../routers/input/user.dto';
import { bcryptService } from '../../auth/adapters/bcrypt.service';
import {
  domainResult,
  notFoundResult,
  Result,
  successResult,
} from '../../core/result/result';

export const usersService = {
  async create(dto: UserDto): Promise<Result<string>> {
    const { login, password, email } = dto;

    const userByLogin = await usersRepository.findByLoginOrEmail(login);
    if (userByLogin) {
      return domainResult(`login already exist`, 'login');
    }

    const userByEmail = await usersRepository.findByLoginOrEmail(email);
    if (userByEmail) {
      return domainResult(`email already exist`, 'email');
    }

    const passwordHash = await bcryptService.generateHash(password);

    const createdAt = new Date();

    const newUser: User = {
      login,
      email,
      passwordHash,
      createdAt,
      emailConfirmation: {
        expirationDate: createdAt,
        confirmationCode: '',
        isConfirmed: true,
      },
    };

    const createdUserId = await usersRepository.create(newUser);

    return successResult(createdUserId);
  },

  async delete(id: string): Promise<Result> {
    const isDeleted = await usersRepository.delete(id);

    if (!isDeleted) {
      return notFoundResult('User not exist');
    }

    return successResult(null);
  },
};
