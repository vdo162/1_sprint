import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { usersQueryRepository } from '../../../users/repositories/users.query.repository';

export async function getMeHandler(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) return res.sendStatus(HttpStatus.Unauthorized);

    const me = await usersQueryRepository.findById(userId);

    return res.status(HttpStatus.Ok).send(me);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
