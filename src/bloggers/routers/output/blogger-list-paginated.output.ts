import { BloggerDataOutput } from './blogger-data.output';
import { PaginatedOutput } from '../../../core/types/paginated.output';

export type BloggerListPaginatedOutput = PaginatedOutput & {
  items: BloggerDataOutput[];
};
