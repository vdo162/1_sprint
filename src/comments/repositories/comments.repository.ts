import { Comment } from '../domain/comment';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../../db';

export const commentsRepository = {
  async findById(id: string): Promise<WithId<Comment> | null> {
    return db.collections.commentsCollection.findOne({
      _id: new ObjectId(id),
    });
  },

  async create(newComment: Comment): Promise<string> {
    const insertResult =
      await db.collections.commentsCollection.insertOne(newComment);

    return insertResult.insertedId.toString();
  },

  async update(
    id: string,
    comment: Omit<Comment, 'createdAt' | 'commentatorInfo' | 'post'>,
  ): Promise<boolean> {
    const updateResult = await db.collections.commentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: comment },
    );

    return updateResult.matchedCount > 0;
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await db.collections.commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },
};
