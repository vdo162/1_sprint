import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { authService } from '../../application/auth.service';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { Unsanitized } from '../../../core/types/unsanitized.input';

export async function registrationEmailResendingHandler(
  req: Request<
    {},
    {},
    Unsanitized<{
      email: string;
    }>
  >,
  res: Response,
) {
  try {
    const { email } = req.body;
    const result = await authService.resendRegistrationEmail(email);

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
