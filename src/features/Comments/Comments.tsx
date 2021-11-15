import React, { useState } from "react";
import { CommentResult } from "src/_shared/types";
import CommentItem from "./CommentItem";

const data = {
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sint rerum porro similique ducimus consequatur quasi illo numquam ea, autem error velit animi tempore expedita. Similique laboriosam aliquid beatae voluptates",
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

const Comments: React.FC = () => {
  return (
    <div>
      <CommentItem data={data} />
    </div>
  );
};

export default Comments;
