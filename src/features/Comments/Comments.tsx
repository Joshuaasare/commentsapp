import React, { useState } from "react";
import { CommentResult } from "src/_shared/types";
import CommentItem from "./CommentItem";
import get from "lodash.get";
import { v4 as uuidV4 } from "uuid";
import CommmentForm from "./CommmentForm";
import { generateRandomUser } from "src/_shared/utils";
import "./css/comments.css";

const Comments: React.FC = () => {
  const [comment, setComment] = useState<CommentResult | null | undefined>(
    null
  );
  const [focusedCommentId, setFocusedCommentId] = useState<
    string | null | undefined
  >(null);

  /**
   *
   * @param path the absolute path of the node to insert
   * @param value value of the node to insert
   * @param obj hierachical object
   * @returns void
   */
  function setValueToPath(
    path: string,
    value: CommentResult,
    obj?: CommentResult | null
  ) {
    let i = 0;

    let paths = path.split(".") as ["nextSibling" | "firstChild"];
    for (i = 0; i < paths.length - 1; i++) {
      if (obj?.[paths[i]]) {
        obj = obj[paths[i]] as CommentResult;
      }
    }

    if (obj) {
      obj[paths[i]] = value;
    }

    return obj;
  }

  /**
   *
   * @param text text of the comment
   * @param accPath the accumulated path of current node being traversed
   * @returns void
   *
   * first uses accPath or "firstChild" path to find
   * the direct child node (first reply), if exists
   * recursively traverses the node to append the
   * comment to the last sibling of the child node
   */
  const addComment = (text: string, accPath = "firstChild") => {
    if (!comment) {
      const newComment: CommentResult = {
        text,
        id: uuidV4(),
        createdTime: new Date(),
        upvotes: 0,
        downvotes: 0,
        user: generateRandomUser(),
      };

      return setComment(newComment);
    }

    if (!get(comment, accPath)) {
      const newComment: CommentResult = {
        text,
        id: uuidV4(),
        path: accPath,
        createdTime: new Date(),
        upvotes: 0,
        downvotes: 0,
        user: generateRandomUser(),
      };

      setValueToPath(accPath, newComment, comment);
      return setComment({ ...comment });
    }
    accPath = `${accPath}.nextSibling`;
    addComment(text, accPath);
  };

  /**
   *
   * @param type type of vote
   * @param path path to the node
   * @returns void
   */
  const onVote = (type: "upvote" | "downvote", path?: string) => {
    // any valid node except parent
    if (path && type && comment) {
      const value = get(comment, path) as CommentResult;
      if (type === "upvote") {
        value.upvotes += 1;
      } else if (type === "downvote") {
        value.downvotes += 1;
      }

      setValueToPath(path, value, comment);
      return setComment({ ...comment });
    }

    // parent node
    if (!path && type && comment) {
      if (type === "upvote") {
        comment.upvotes += 1;
      } else if (type === "downvote") {
        comment.downvotes += 1;
      }

      return setComment({ ...comment });
    }
  };

  if (!comment) {
    return (
      <div className="comment-header">
        <span>Add the first comment</span>
        <CommmentForm addComment={addComment} data={comment} />
      </div>
    );
  }

  return (
    <CommentItem
      data={comment}
      addComment={addComment}
      focusedCommentId={focusedCommentId}
      setFocusedCommentId={setFocusedCommentId}
      onVote={onVote}
    />
  );
};

export default Comments;
