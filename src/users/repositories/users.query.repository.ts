import { ObjectId } from 'mongodb';
import { UserQueryParams } from '../routers/input/user-query-params';
import { db } from '../../db';
import { UserOutput } from '../routers/output/user.output';
import { mapToPaginatedOutput } from '../../core/mappers/map-to-paginated-output';
import { PaginatedOutput } from '../../core/types/paginated.output';
import { mapToUserOutput } from '../routers/mappers/map-to-user-output.util';

export const usersQueryRepository = {
  async findMany(
    queryParams: UserQueryParams,
  ): Promise<PaginatedOutput<UserOutput[]>> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchLoginTerm,
      searchEmailTerm,
    } = queryParams;

    const skip = (pageNumber - 1) * pageSize;

    const filterConditions = [];
    if (searchLoginTerm) {
      filterConditions.push({
        login: { $regex: searchLoginTerm, $options: 'i' },
      });
    }
    if (searchEmailTerm) {
      filterConditions.push({
        email: { $regex: searchEmailTerm, $options: 'i' },
      });
    }
    const filter = filterConditions.length ? { $or: filterConditions } : {};

    const [items, totalCount] = await Promise.all([
      db.collections.usersCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      db.collections.usersCollection.countDocuments(filter),
    ]);

    return mapToPaginatedOutput(
      items,
      {
        pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount,
      },
      mapToUserOutput,
    );
  },

  async findById(id: string): Promise<UserOutput | null> {
    const user = await db.collections.usersCollection.findOne({
      _id: new ObjectId(id),
    });
    return user ? mapToUserOutput(user) : null;
  },
};
