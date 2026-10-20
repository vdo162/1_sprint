export type Post = {
  title: string;
  shortDescription: string;
  content: string;
  createdAt: Date;
  blog: {
    id: string;
    name: string;
  };
};
