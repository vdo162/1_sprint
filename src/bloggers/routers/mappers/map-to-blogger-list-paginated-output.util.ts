import { WithId } from 'mongodb';
import { mapToPaginatedOutput } from '../../../core/mappers/map-to-paginated-output';
import { mapToBloggerOutput } from './map-to-blogger-output.util';
import { BloggerListPaginatedOutput } from '../output/blogger-list-paginated.output';
import { Blogger } from '../../domain/blogger';

export function mapToBloggerListPaginatedOutput(
  bloggers: WithId<Blogger>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): BloggerListPaginatedOutput {
  return mapToPaginatedOutput(bloggers, meta, mapToBloggerOutput);
}
