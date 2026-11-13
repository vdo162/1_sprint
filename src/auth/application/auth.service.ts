import { bcryptService } from '../adapters/bcrypt.service';
import { usersRepository } from '../../users/repositories/users.repository';
import {
  badRequestResult,
  notFoundResult,
  Result,
  successResult,
  unauthorizedResult,
} from '../../core/result/result';
import { jwtService } from '../adapters/jwt.service';
import { EmailConfirmation, User } from '../../users/domain/user';
import { WithId } from 'mongodb';
import { randomUUID } from 'node:crypto';
import { nodemailerService } from '../adapters/nodemailer.service';
import { emailTemplate } from '../adapters/emailTemplate';
import { UserDto } from '../../users/routers/input/user.dto';
import { addMinutes } from 'date-fns';

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

    if (!user.emailConfirmation.isConfirmed) return null;

    const isPassCorrect = await bcryptService.checkPassword(
      password,
      user.passwordHash,
    );

    if (!isPassCorrect) return null;

    return user;
  },

  async registerUser(dto: UserDto): Promise<Result<string>> {
    const { login, email, password } = dto;

    const userByLogin = await usersRepository.findByLogin(login);
    if (userByLogin) {
      return badRequestResult(`Login already exist`, 'login');
    }

    const userByEmail = await usersRepository.findByEmail(email);
    if (userByEmail) {
      return badRequestResult(`Email already exist`, 'email');
    }

    const passwordHash = await bcryptService.generateHash(password);
    const newUser: User = {
      login,
      email,
      passwordHash,
      createdAt: new Date(),
      emailConfirmation: {
        expirationDate: addMinutes(new Date(), 60),
        confirmationCode: randomUUID(),
        isConfirmed: false,
      },
    };
    const createdUserId = await usersRepository.create(newUser);

    try {
      await nodemailerService.sendEmail(
        newUser.email,
        newUser.emailConfirmation.confirmationCode,
        emailTemplate.registration,
      );
    } catch (err) {
      console.log(err);
    }

    return successResult(createdUserId);
  },

  async confirmEmail(confirmationCode: string): Promise<Result> {
    const userByCode =
      await usersRepository.findByConfirmationCode(confirmationCode);

    if (!userByCode) {
      return badRequestResult(
        `Confirmation code is invalid or expired`,
        'code',
      );
    }

    if (userByCode.emailConfirmation.expirationDate < new Date()) {
      return badRequestResult(`Confirmation code has expired`, 'code');
    }

    if (userByCode.emailConfirmation.isConfirmed) {
      return badRequestResult(`Email is already confirmed`, 'code');
    }

    await usersRepository.updateConfirmationStatus(userByCode._id, true);

    return successResult(null);
  },

  async resendRegistrationEmail(email: string): Promise<Result> {
    const userByEmail = await usersRepository.findByEmail(email);
    if (!userByEmail) {
      return badRequestResult(`Invalid credentials`, 'email');
    }

    if (userByEmail.emailConfirmation.isConfirmed) {
      return badRequestResult(`Email is already confirmed`, 'email');
    }

    const newEmailConfirmation: EmailConfirmation = {
      expirationDate: addMinutes(new Date(), 60),
      confirmationCode: randomUUID(),
      isConfirmed: false,
    };
    await usersRepository.updateConfirmation(
      userByEmail._id,
      newEmailConfirmation,
    );

    try {
      await nodemailerService.sendEmail(
        email,
        newEmailConfirmation.confirmationCode,
        emailTemplate.registration,
      );
    } catch (err) {
      console.log(err);
    }

    return successResult(null);
  },
};
