import React, { useState } from "react";
import { CommentResult } from "src/_shared/types";
import CommentItem from "./CommentItem";
import get from "lodash.get";
import { v4 as uuidV4 } from "uuid";
import CommmentForm from "./CommmentForm";
import "./css/comments.css";
import { generateRandomUser } from "src/_shared/utils";

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
    accPath = accPath + "." + "nextSibling";
    addComment(text, accPath);
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
    />
  );
};

export default Comments;
