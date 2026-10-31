import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { LoginInput } from '../input/user.dto';
import { authService } from '../../application/auth.service';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function loginUserHandler(
  req: Request<{}, {}, LoginInput>,
  res: Response,
) {
  try {
    const { loginOrEmail, password } = req.body;

    const result = await authService.loginUser(loginOrEmail, password);
    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
