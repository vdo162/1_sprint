import { Blogger } from '../types/blogger';
import { db } from '../../db/in-memory.db';

export const bloggersRepository = {
  findAll(): Blogger[] {
    return db.bloggers;
  },

  findById(id: string): Blogger | null {
    return db.bloggers.find((b) => b.id === id) ?? null;
  },

  create(newBlogger: Omit<Blogger, 'id'>): Blogger {
    const lastBlogger = db.bloggers[db.bloggers.length - 1];
    const created: Blogger = {
      id: String(lastBlogger ? +lastBlogger.id + 1 : 1),
      ...newBlogger,
    };

    db.bloggers.push(created);
    return created;
  },

  update(id: string, blogger: Omit<Blogger, 'id'>): boolean {
    const index = db.bloggers.findIndex((b) => b.id === id);

    if (index === -1) {
      return false;
    }

    db.bloggers[index] = { ...db.bloggers[index], ...blogger };
    return true;
  },

  delete(id: string): boolean {
    const index = db.bloggers.findIndex((b) => b.id === id);

    if (index === -1) {
      return false;
    }

    db.bloggers.splice(index, 1);
    return true;
  },
};
