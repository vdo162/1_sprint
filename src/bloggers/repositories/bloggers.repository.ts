import { Blogger } from '../domain/blogger';
import { ObjectId, WithId } from 'mongodb';
import { bloggerCollection } from '../../db/collections';
import { BloggerQueryInput } from '../routers/input/blogger-query.input';

export const bloggersRepository = {
  async findMany(
    queryInput: BloggerQueryInput,
  ): Promise<{ items: WithId<Blogger>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryInput;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const items = await bloggerCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await bloggerCollection.countDocuments(filter);

    return { items, totalCount };
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
