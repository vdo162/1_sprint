export enum CommentSortField {
  CreatedAt = 'createdAt',
  UserLogin = 'userLogin',
}

export enum MappedCommentSortField {
  CreatedAt = 'createdAt',
  UserLogin = 'commentatorInfo.userLogin',
}
