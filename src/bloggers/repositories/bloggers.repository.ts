import { Blogger } from '../types/blogger';
import { ObjectId, WithId } from 'mongodb';
import { bloggerCollection } from '../../db/collections';

export const bloggersRepository = {
  async findAll(): Promise<WithId<Blogger>[]> {
    return bloggerCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Blogger> | null> {
    return bloggerCollection.findOne({ _id: new ObjectId(id) });
  },

  async create(newBlogger: Blogger): Promise<WithId<Blogger>> {
    const insertResult = await bloggerCollection.insertOne(newBlogger);
    return { ...newBlogger, _id: insertResult.insertedId };
  },

  async update(
    id: string,
    blogger: Omit<Blogger, 'isMembership' | 'createdAt'>,
  ): Promise<boolean> {
    const updateResult = await bloggerCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blogger },
    );

    return updateResult.matchedCount > 0;
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await bloggerCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },
};
