import { Blog } from '../domain/blog';
import { ObjectId } from 'mongodb';
import { db } from '../../db';
import { BlogOutput } from '../routers/output/blog.output';
import { mapToBlogOutput } from '../routers/mappers/map-to-blog-output.util';

export const blogsRepository = {
  async findById(id: string): Promise<BlogOutput | null> {
    const blog = await db.collections.blogsCollection.findOne({
      _id: new ObjectId(id),
    });
    return blog ? mapToBlogOutput(blog) : null;
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
