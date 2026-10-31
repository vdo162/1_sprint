import { ObjectId } from 'mongodb';
import { BlogQueryParams } from '../routers/input/blog-query-params';
import { db } from '../../db';
import { mapToBlogOutput } from '../routers/mappers/map-to-blog-output.util';
import { BlogOutput } from '../routers/output/blog.output';
import { mapToPaginatedOutput } from '../../core/mappers/map-to-paginated-output';
import { PaginatedOutput } from '../../core/types/paginated.output';

export const blogsQueryRepository = {
  async findMany(
    queryParams: BlogQueryParams,
  ): Promise<PaginatedOutput<BlogOutput[]>> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryParams;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const items = await db.collections.blogsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount =
      await db.collections.blogsCollection.countDocuments(filter);

    return mapToPaginatedOutput(
      items,
      {
        pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount,
      },
      mapToBlogOutput,
    );
  },

  async findById(id: string): Promise<BlogOutput | null> {
    const blog = await db.collections.blogsCollection.findOne({
      _id: new ObjectId(id),
    });
    return blog ? mapToBlogOutput(blog) : null;
  },
};
