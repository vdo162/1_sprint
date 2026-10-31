import { PaginationAndSortingFields } from '../../../core/types/pagination-and-sorting-fields';
import { UserSortField } from './user-sort-field';

export type UserQueryParams = PaginationAndSortingFields<UserSortField> & {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
};
