import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { authService } from '../../application/auth.service';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { Unsanitized } from '../../../core/types/unsanitized.input';

export async function registrationConfirmationHandler(
  req: Request<
    {},
    {},
    Unsanitized<{
      code: string;
    }>
  >,
  res: Response,
) {
  try {
    const { code } = req.body;

    const result = await authService.confirmEmail(code);

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
