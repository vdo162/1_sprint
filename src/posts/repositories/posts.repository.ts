import { Post } from '../domain/post';
import { postCollection } from '../../db/collections';
import { ObjectId, WithId } from 'mongodb';
import { MappedPostQueryInput } from '../routers/input/post-query.input';

export const postsRepository = {
  async findMany(
    queryInput: MappedPostQueryInput,
    blogId?: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryInput;
    console.log({ queryInput });
    let filter = {};
    if (blogId) {
      filter = { 'blog.id': blogId };
    }
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      postCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },

  async create(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postCollection.insertOne(newPost);
    return { ...newPost, _id: insertResult.insertedId };
  },

  async update(id: string, post: Omit<Post, 'createdAt'>): Promise<boolean> {
    const updateResult = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: post },
    );

    return updateResult.matchedCount > 0;
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },
};
