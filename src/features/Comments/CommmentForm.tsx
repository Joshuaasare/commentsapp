import React, { useState } from "react";
import { CommentResult } from "../../_shared/types";
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
  defaultValue?: string;
  submitButtonText?: string;
}
const CommmentForm: React.FC<Props> = ({
  addComment,
  data,
  onSubmit,
  onClose,
  defaultValue,
  submitButtonText = "Add Comment",
}) => {
  const [text, setText] = useState(defaultValue);

  return (
    <div data-testid="comment-form" className="comment-form">
      <textarea
        data-testid="form-textarea"
        onChange={(ev) => setText(ev.currentTarget.value)}
        className="textarea"
        inputMode="text"
        defaultValue={defaultValue}
        value={text}
      />
      <span>
        <button
          data-testid="form-add-button"
          className="add-button"
          onClick={() => {
            const accPath = data?.path
              ? `${data.path}.firstChild`
              : "firstChild";

            text && addComment && addComment(text, accPath);
            setText("");
            onSubmit && onSubmit();
          }}
        >
          {submitButtonText}
        </button>
        {onClose && (
          <button
            data-testid="form-close-button"
            className="close-button"
            onClick={onClose}
          >
            close
          </button>
        )}
      </span>
    </div>
  );
};

export default CommmentForm;
