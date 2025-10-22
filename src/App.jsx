import { useState, useEffect } from "react";
import { getComments, postComment } from "./api";
import { CommentCard } from "./components/CommentCard";
import { CommentForm } from "./components/CommentForm";
// import { useWebSocket } from "./hooks/useWebSocket";
// import { Pagination } from "./components/Pagination";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [comments, setComments] = useState([]);
  const [commentsRange, setCommentsRange] = useState([]);
  const [userAttributes, setUserAttributes] = useState({});
  const apiLimit = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(commentsRange.total / apiLimit);
  // const navigate = useNavigate();
  // const location = useLocation();

  const fetchCommentsByPage = (page) => {
    getComments(page)
      .then((data) => {
        console.log(data);
        setCommentsRange({
          first: data.firstRecord,
          last: data.lastRecord,
          total: data.totalRecords
        })
        setComments(data.items)
      })
      .catch(console.error);
  }

  // Load existing comments on mount  
  useEffect(() => {
    const socket = new WebSocket("wss://ts9cmsgs7j.execute-api.eu-west-2.amazonaws.com/prod/");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("📨 Message received:", event.data);
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.type === "COMMENT_APPROVED") {
        const commentObject = {
          ...data.data,
          newComment: true,
        }
        setComments((prev) => [commentObject, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
    };
  
    fetchCommentsByPage(currentPage)

    async function getUserName() {
      const attributes = await fetchUserAttributes();
      setUserAttributes(attributes);
    }
    getUserName();
  }, []);

  // Handle new WebSocket messages
  // useWebSocket((data) => {
  //   if (data.type === "COMMENT_APPROVED") {

  //     const commentObject = {
  //       ...data.data,
  //       newComment: true,
  //     }
  //     console.log(`>>>>>> NEW COMMENT RECEIVED: ${JSON.stringify(commentObject)}`);
  //     setComments((prev) => [commentObject, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  //   }
  // });

  // Handle new comment submission
  const handlePost = async (commentData) => {
    try {
      const newComment = await postComment(commentData);
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

    return (
      <Authenticator>
        {({ signOut, user }) => (
          <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {userAttributes?.name || user.username}!
            </h1>
            <div className="max-w-xl mx-auto mt-10 space-y-6">
              <h1 className="text-2xl font-bold text-center">💬 Comments</h1>
              <CommentForm onSubmit={handlePost} />
              <p>Showing {commentsRange.first} to {commentsRange.last} of {commentsRange.total} comments.</p>
              <p>Page {currentPage} of {totalPages}</p>
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  fetchCommentsByPage(page)
                }}
              /> */}
              <div>
                {comments.length === 0 ? (
                  <p className="text-center text-gray-500">No comments yet.</p>
                ) : (
                  comments.map((c) => <CommentCard key={c.id} comment={c} currentUser={userAttributes.name} />)
                )}
              </div>
            </div>
            <button
              onClick={signOut}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-center mx-auto"
            >
              Sign out
            </button>
          </main>
        )}
      </Authenticator>
    );
}

export default App;
