import React, { useState } from "react";
import { CommentResult } from "src/_shared/types";
interface Props {
  addComment?: (
    text: string,
    accPath?: string,
    parent?: CommentResult | null | undefined
  ) => void;
  data?: CommentResult;
  onSubmit?: () => void;
}
const CommmentForm: React.FC<Props> = ({ addComment, data, onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <span>
      <textarea onChange={(ev) => setText(ev.currentTarget.value)} />
      <button
        onClick={() => {
          const accPath = data?.path
            ? data?.path + "." + "firstChild"
            : "firstChild";
          addComment && addComment(text, accPath);
          onSubmit && onSubmit();
        }}
      >
        Add comment
      </button>
    </span>
  );
};

export default CommmentForm;
