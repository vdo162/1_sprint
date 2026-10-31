import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { usersService } from '../../application/users.service';
import { usersQueryRepository } from '../../repositories/users.query.repository';
import { UserInput } from '../input/user.dto';
import { mapUserInputToDto } from '../mappers/map-user-input-to-dto.util';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function createUserHandler(
  req: Request<{}, {}, UserInput>,
  res: Response,
) {
  try {
    const result = await usersService.create(mapUserInputToDto(req.body));

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    const createdUser = await usersQueryRepository.findById(result.data);

    res.status(HttpStatus.Created).send(createdUser);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
