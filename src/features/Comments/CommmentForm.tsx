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
}
const CommmentForm: React.FC<Props> = ({ addComment, data, onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <div className="comment-form">
      <textarea
        onChange={(ev) => setText(ev.currentTarget.value)}
        className="textarea"
      />
      <button
        className="button"
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
    </div>
  );
};

export default CommmentForm;
