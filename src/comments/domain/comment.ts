export type Comment = {
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  post: {
    id: string;
  };
  createdAt: Date;
};
