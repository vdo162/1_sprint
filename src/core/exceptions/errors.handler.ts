import { Response } from 'express';
import { NotFoundException } from './not-found.exception';
import { HttpStatus } from '../types/http-statuses';
import { createErrorsMessages } from '../middlewares/validation/input-validation-result.middleware';

export function errorsHandler(error: unknown, res: Response): void {
  if (error instanceof NotFoundException) {
    const httpStatus = HttpStatus.NotFound;

    res.status(httpStatus).send(
      createErrorsMessages([
        {
          field: 'id',
          message: error.message,
        },
      ]),
    );

    return;
  }

  res.status(HttpStatus.InternalServerError).send(
    createErrorsMessages([
      {
        field: '',
        message: 'Internal server error',
      },
    ]),
  );
}
