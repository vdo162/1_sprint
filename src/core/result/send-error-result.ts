import { Response } from 'express';
import { Result, resultStatusToHttp } from './result';
import { createErrorsMessages } from '../middlewares/validation/input-validation-result.middleware';

export function sendErrorResult(result: Result<unknown>, res: Response): void {
  const httpStatus = resultStatusToHttp[result.status];

  res.status(httpStatus).send(
    createErrorsMessages(
      (result.errors ?? []).map((error) => ({
        field: error.source || '',
        message: error.code ? `${error.code}: ${error.detail}` : error.detail,
      })),
    ),
  );
}
