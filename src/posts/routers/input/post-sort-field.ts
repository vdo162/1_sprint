export enum PostSortField {
  CreatedAt = 'createdAt',
  Title = 'title',
  BlogName = 'blogName',
}

export enum MappedPostSortField {
  CreatedAt = 'createdAt',
  Title = 'title',
  BlogName = 'blog.name',
}

export const postSortFieldMapper: Record<PostSortField, MappedPostSortField> = {
  [PostSortField.CreatedAt]: MappedPostSortField.CreatedAt,
  [PostSortField.Title]: MappedPostSortField.Title,
  [PostSortField.BlogName]: MappedPostSortField.BlogName,
};
