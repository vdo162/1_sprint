import { Blog } from '../domain/blog';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../../db';

export const blogsRepository = {
  async findById(id: string): Promise<WithId<Blog> | null> {
    return db.collections.blogsCollection.findOne({
      _id: new ObjectId(id),
    });
  },

  async create(newBlog: Blog): Promise<string> {
    const insertResult =
      await db.collections.blogsCollection.insertOne(newBlog);

    return insertResult.insertedId.toString();
  },

  async update(
    id: string,
    blog: Omit<Blog, 'isMembership' | 'createdAt'>,
  ): Promise<boolean> {
    const updateResult = await db.collections.blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blog },
    );

    return updateResult.matchedCount > 0;
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await db.collections.blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },
};
