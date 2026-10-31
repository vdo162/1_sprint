import { Request, Response } from 'express';
import { UserQueryParams } from '../input/user-query-params';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';
import { usersQueryRepository } from '../../repositories/users.query.repository';

export async function getUserListHandler(
  req: Request<{}, {}, {}, UserQueryParams>,
  res: Response,
) {
  try {
    const queryParams = req.query;

    const users = await usersQueryRepository.findMany(queryParams);

    res.status(HttpStatus.Ok).send(users);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
