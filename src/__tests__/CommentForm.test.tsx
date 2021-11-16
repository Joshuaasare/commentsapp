import React from "react";
import { CommentForm } from "src/features/Comments";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("CommentForm can set default value of text area ", async () => {
  render(<CommentForm defaultValue="test comment" />);
  expect(await screen.findByTestId("form-textarea")).toHaveValue(
    "test comment"
  );
});
