import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../adapters/jwt.service';
import { HttpStatus } from '../../core/types/http-statuses';

export const accessTokenGuardMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization)
    return res.sendStatus(HttpStatus.Unauthorized);

  const [authType, token] = req.headers.authorization.split(' ');

  if (authType !== 'Bearer') return res.sendStatus(HttpStatus.Unauthorized);

  const payload = await jwtService.verifyToken(token);

  if (!payload) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  req.userId = payload.userId;

  return next();
};
