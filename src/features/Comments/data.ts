import { CommentResult } from "src/_shared/types";

export const data = {
  text: "lorem1",
  upvotes: 0,
  downvotes: 0,
  id: "1",
  createdTime: new Date(),
  parent: null,
  ForwardSibling: {
    text: "lore2",
    upvotes: 0,
    downvotes: 0,
    id: "2",
    createdTime: new Date(),
    parent: null,
    FirstChild: null,
    ForwardSibling: null,
  },

  FirstChild: {
    text: "lore3",
    upvotes: 0,
    downvotes: 0,
    id: "3",
    createdTime: new Date(),
    ForwardSibling: null,
  },
};
