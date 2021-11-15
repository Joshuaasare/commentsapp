import React, { useState } from "react";
import { Icon } from "src/_shared/components";
import { CommentResult } from "src/_shared/types";
import "./css/commentItem.css";

interface Props {
  data?: CommentResult | null;
  addComment?: (
    text: string,
    accPath?: string,
    parent?: CommentResult | null | undefined
  ) => void;
}

const CommentItem: React.FC<Props> = ({ data, addComment }) => {
  const [showReply, setShowReply] = useState(!data);
  const [text, setText] = useState("");
  const renderComment = (comment?: CommentResult) => {
    return (
      <>
        <div className="comment__avatar">
          <span className={comment?.path ? "avatar__small" : "avatar__large"}>
            {}
          </span>
        </div>

        <div className="comment__body">
          <div className="comment__group">
            <div className="comment__thumbnail">
              <span className="comment__thumbnail--user">nomis8576</span>
              <span className="comment__thumbnail--days">23 days ago</span>
            </div>

            <div className="comment__text">
              <span>{comment?.text}</span>
            </div>

            <div className="comment__toolbar">
              <span className="comment__icon-group">
                <Icon
                  name="arrow-thick-up"
                  id="upvote"
                  size={1.5}
                  color="#00000066"
                  className="comment__icon"
                />
                <span className="vote-text">{comment?.upvotes}</span>
              </span>

              <span className="comment__icon-group">
                <Icon
                  name="arrow-thick-down"
                  id="downvote"
                  size={1.5}
                  color="#00000066"
                  className="comment__icon"
                />
                <span className="vote-text">{comment?.downvotes}</span>
              </span>

              <span
                className="comment__link-group"
                onClick={() => setShowReply(true)}
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

        {showReply && (
          <span>
            <textarea onChange={(ev) => setText(ev.currentTarget.value)} />
            <button
              onClick={() => {
                const accPath = comment?.path
                  ? comment?.path + "." + "firstChild"
                  : "firstChild";
                addComment && addComment(text, accPath);
                setShowReply(false);
              }}
            >
              add comment
            </button>
          </span>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="comment">
        {data?.text && renderComment(data)}
        {data?.firstChild && (
          <div style={{ paddingLeft: 20 }}>
            <CommentItem data={data.firstChild} addComment={addComment} />
          </div>
        )}
      </div>
      {data?.nextSibling && (
        <CommentItem data={data.nextSibling} addComment={addComment} />
      )}
    </React.Fragment>
  );
};

export default CommentItem;
