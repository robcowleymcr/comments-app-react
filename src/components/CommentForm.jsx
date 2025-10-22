import { useState } from "react";

export function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="border p-2 rounded-md resize-none"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Post Comment
      </button>
    </form>
  );
}
