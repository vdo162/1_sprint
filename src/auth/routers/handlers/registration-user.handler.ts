import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { authService } from '../../application/auth.service';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { UserInput } from '../../../users/routers/input/user.dto';
import { mapUserInputToDto } from '../../../users/routers/mappers/map-user-input-to-dto.util';

export async function registrationUserHandler(
  req: Request<{}, {}, UserInput>,
  res: Response,
) {
  try {
    const result = await authService.registerUser(mapUserInputToDto(req.body));

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
