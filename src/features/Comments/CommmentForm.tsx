import React, { useState } from "react";
import { CommentResult } from "src/_shared/types";
import "./css/commentForm.css";
interface Props {
  addComment?: (
    text: string,
    accPath?: string,
    parent?: CommentResult | null | undefined
  ) => void;
  data?: CommentResult | null;
  onSubmit?: () => void;
  onClose?: () => void;
}
const CommmentForm: React.FC<Props> = ({
  addComment,
  data,
  onSubmit,
  onClose,
}) => {
  const [text, setText] = useState("");
  return (
    <div className="comment-form">
      <textarea
        onChange={(ev) => setText(ev.currentTarget.value)}
        className="textarea"
        inputMode="text"
      />
      <span>
        <button
          className="add-button"
          onClick={() => {
            const accPath = data?.path
              ? data?.path + "." + "firstChild"
              : "firstChild";
            text && addComment && addComment(text, accPath);
            onSubmit && onSubmit();
          }}
        >
          Add comment
        </button>
        {onClose && (
          <button className="close-button" onClick={onClose}>
            close
          </button>
        )}
      </span>
    </div>
  );
};

export default CommmentForm;
