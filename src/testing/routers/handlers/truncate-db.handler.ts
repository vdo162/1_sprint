import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db';

export async function truncateDbHandler(req: Request, res: Response) {
  try {
    await db.drop();

    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
