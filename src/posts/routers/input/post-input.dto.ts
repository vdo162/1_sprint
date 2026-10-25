export type PostInputDto = {
  title: string;
  shortDescription: string;
  content: string;
};

export type PostInputDtoWithBlogId = PostInputDto & {
  blogId: string;
};
