import { Post } from '../domain/post';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../../db';

export const postsRepository = {
  async findById(id: string): Promise<WithId<Post> | null> {
    return db.collections.postsCollection.findOne({
      _id: new ObjectId(id),
    });
  },

  async create(newPost: Post): Promise<string> {
    const insertResult =
      await db.collections.postsCollection.insertOne(newPost);

    return insertResult.insertedId.toString();
  },

  async update(id: string, post: Omit<Post, 'createdAt'>): Promise<boolean> {
    const updateResult = await db.collections.postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: post },
    );

    return updateResult.matchedCount > 0;
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await db.collections.postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },
};
