import { Request, Response } from 'express';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';

export function truncateDbHandler(req: Request, res: Response) {
  db.bloggers = [];
  db.posts = [];
  res.sendStatus(HttpStatus.NoContent);
}
