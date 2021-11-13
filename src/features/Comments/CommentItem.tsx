import React from "react";
import { CommentResult } from "src/_shared/types";
import "./css/commentItem.css";

interface Props {
  data?: CommentResult;
}

const CommentItem: React.FC<Props> = () => {
  return (
    <section>
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
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                vel numquam iure dolor, aliquid non dolorem nihil ea, ab qui ut
                repudiandae magnam tempore et molestias quibusdam quo esse
                dignissimos.
              </span>
            </div>

            <div className="comment__toolbar">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentItem;
