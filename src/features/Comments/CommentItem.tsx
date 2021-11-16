import React from "react";
import { Icon } from "src/_shared/components";
import { CommentResult } from "src/_shared/types";
import CommmentForm from "./CommmentForm";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "./css/commentItem.css";

// English.
TimeAgo.addDefaultLocale(en);

interface Props {
  data?: CommentResult | null;
  addComment?: (
    text: string,
    accPath?: string,
    parent?: CommentResult | null | undefined
  ) => void;
  focusedCommentId?: string | null;
  setFocusedCommentId?: (id?: string | null) => void;
  onVote?: (type: "upvote" | "downvote", path?: string) => void;
}

const CommentItem: React.FC<Props> = ({
  data,
  addComment,
  focusedCommentId,
  setFocusedCommentId,
  onVote,
}) => {
  const timeAgo = new TimeAgo("en-US");
  const renderComment = (comment?: CommentResult) => {
    return (
      <>
        <div className="comment__avatar">
          <div className={comment?.path ? "avatar__small" : "avatar__large"}>
            <img src={comment?.user?.avatar} alt="avatar" />
          </div>
        </div>

        <div className="comment__body">
          <div className="comment__group">
            <div className="comment__thumbnail">
              <span className="comment__thumbnail--user">
                {comment?.user?.username}
              </span>
              <span className="comment__thumbnail--days">
                {timeAgo.format(comment?.createdTime as Date)}
              </span>
            </div>

            <div className="comment__text">
              <span>{comment?.text}</span>
            </div>

            <div className="comment__toolbar">
              <span className="comment__icon-group">
                <Icon
                  name="arrow-thick-up"
                  id="upvote"
                  size={1.3}
                  color="#00000066"
                  className="comment__icon"
                  onClick={() => onVote && onVote("upvote", comment?.path)}
                />

                <span className="vote-text">
                  {comment && comment?.upvotes - comment?.downvotes}
                </span>

                <Icon
                  name="arrow-thick-down"
                  id="downvote"
                  size={1.3}
                  color="#00000066"
                  className="comment__icon"
                  onClick={() => onVote && onVote("downvote", comment?.path)}
                />
              </span>

              <span
                className="comment__link-group"
                onClick={() =>
                  setFocusedCommentId && setFocusedCommentId(comment?.id)
                }
              >
                <Icon name="message" id="reply" size={1.5} color="#00000066" />
                <span>Reply</span>
              </span>

              <span className="comment__link-group">
                <span>Share</span>
              </span>

              <span className="comment__link-group">
                <span>Report</span>
              </span>

              <span className="comment__link-group">
                <span>Save</span>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="comment">
        {data?.text && renderComment(data)}
        {data?.firstChild && (
          <div style={{ paddingLeft: 20 }}>
            <CommentItem
              data={data.firstChild}
              addComment={addComment}
              focusedCommentId={focusedCommentId}
              setFocusedCommentId={setFocusedCommentId}
              onVote={onVote}
            />
          </div>
        )}

        {/**show the reply form only when reply is clicked and comment is set as focused*/}
        {focusedCommentId === data?.id && (
          <div style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>
            <CommmentForm
              data={data}
              addComment={addComment}
              onSubmit={() => setFocusedCommentId && setFocusedCommentId(null)}
              onClose={() => setFocusedCommentId && setFocusedCommentId(null)}
            />
          </div>
        )}
      </div>
      {data?.nextSibling && (
        <CommentItem
          data={data.nextSibling}
          addComment={addComment}
          focusedCommentId={focusedCommentId}
          setFocusedCommentId={setFocusedCommentId}
          onVote={onVote}
        />
      )}
    </React.Fragment>
  );
};

export default CommentItem;
