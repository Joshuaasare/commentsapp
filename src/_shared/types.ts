// contains all the types used in the project
export type CommentResult = {
  text: string;
  upvotes: number;
  downvotes: number;
  id: string;
  createdTime: Date;
  editedTime?: Date;
  parent?: CommentResult | null;
  ForwardSibling?: CommentResult | null;
  BackwardSibling?: CommentResult | null;
  FirstChild?: CommentResult | null;
};

export type UserResult = {
  username: string;
  avatar: string;
};
