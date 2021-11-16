// contains all the types used in the project
export type CommentResult = {
  text?: string;
  upvotes: number;
  downvotes: number;
  id: string;
  createdTime?: Date;
  editedTime?: Date;
  nextSibling?: CommentResult | null;
  firstChild?: CommentResult | null;
  path?: string;
  user?: UserResult;
};

export type UserResult = {
  username?: string;
  avatar: string;
};
