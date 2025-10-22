import { useEffect, useState } from "react";

export function CommentCard({ comment, currentUser }) {
  const [highlight, setHighlight] = useState(comment.newComment);

  useEffect(() => {
    if (comment.newComment) {
      const timer = setTimeout(() => setHighlight(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [comment.newComment]);

  return (
    <div className={`transition-colors duration-700 border rounded-lg p-4 mb-2 ${highlight ? "bg-blue-50" : "bg-white"} shadow-sm`}>
      <p className="text-gray-700">{comment.text}</p>
      <p className="text-xs text-gray-500 mt-1">Status: {comment.status}</p>
      <p className="text-xs text-gray-500 mt-1">Date: {new Date(comment.createdAt).toLocaleString()}</p>
      <p className="text-xs text-gray-500 mt-1">Posted by: {comment.userName || "Unknown"}{currentUser === comment.userName ? " (You)" : ""}</p>
    </div>
  );
}
