import React from "react";
import { Icon } from "src/_shared/components";
import { CommentResult } from "src/_shared/types";
import "./css/commentItem.css";

interface Props {
  data?: CommentResult;
}

const CommentItem: React.FC<Props> = ({ data }) => {
  const renderComment = (comment?: CommentResult) => {
    return (
      <div className="comment">
        <div className="comment__avatar">
          <span className="avatar">{}</span>
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

              <span className="comment__link-group">
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
      </div>
    );
  };

  return (
    <section>
      {data?.text && renderComment(data)}
      {data?.ForwardSibling && <CommentItem data={data.ForwardSibling} />}
      {data?.FirstChild && (
        <div style={{ paddingLeft: 30 }}>
          <CommentItem data={data.FirstChild} />
        </div>
      )}
    </section>
  );
};

export default CommentItem;
