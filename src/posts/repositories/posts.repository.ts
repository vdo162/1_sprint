import { Post } from '../types/post';
import { db } from '../../db/in-memory.db';

export const postsRepository = {
  findAll(): Post[] {
    return db.posts;
  },

  findById(id: string): Post | null {
    return db.posts.find((p) => p.id === id) ?? null;
  },

  create(newPost: Omit<Post, 'id'>): Post {
    const lastPost = db.posts[db.posts.length - 1];
    const created: Post = {
      id: String(lastPost ? +lastPost.id + 1 : 1),
      ...newPost,
    };

    db.posts.push(created);
    return created;
  },

  update(id: string, post: Omit<Post, 'id'>): boolean {
    const index = db.posts.findIndex((b) => b.id === id);

    if (index === -1) {
      return false;
    }

    db.posts[index] = { ...db.posts[index], ...post };
    return true;
  },

  delete(id: string): boolean {
    const index = db.posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return false;
    }

    db.posts.splice(index, 1);
    return true;
  },
};
