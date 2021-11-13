// contains all the types used in the project
export type CommentResult = {
  text: string;
  upvotes: number;
  downvotes: number;
  createdTime: Date;
  replies?: CommentResult[];
  editedTime?: Date;
};

export type UserResult = {
  username: string;
  avatar: string;
};
