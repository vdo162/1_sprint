import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { SETTINGS } from '../../settings/config';

const ADMIN_TOKEN =
  'Basic ' +
  Buffer.from(`${SETTINGS.ADMIN.LOGIN}:${SETTINGS.ADMIN.PASSWORD}`).toString(
    'base64',
  );

export const superAdminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers['authorization'] !== ADMIN_TOKEN) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  next();
};
