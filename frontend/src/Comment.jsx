import { useState } from "react";
import "./assets/book.css";
import toast from "react-hot-toast";
import { likeComment } from "./services/like-comment";
import { findBookById } from "./services/find-book-by-id";
import { dislikeComment } from "./services/dislike-comment";
import { createLike } from "./services/create-like";
// eslint-disable-next-line
const Comment = ({ comment, onLike, onDislike, dislikes, likes }) => (
  <div className="flex items-center space-x-2 border-b border-gray-700 py-2">
    <div className="relative group">
      <div className="w-8 h-8 bg-gray-300 rounded-full p-2 svg-username">
        <div
          className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs py-1 px-2 absolute top-12 right-0 left-1 rounded-full"
          style={{ zIndex: 9999, width: "85px" }}
        >
          {/*  eslint-disable-next-line */}
          {comment?.username}
        </div>
        <svg className="svg-icon w-full h-full" viewBox="0 0 20 20">
          <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
        </svg>
      </div>
    </div>
    <div>
      {/*  eslint-disable-next-line */}
      <p className=" text-black">{comment?.comment}</p>
      {/*  eslint-disable-next-line */}
      <p className="text-xs italic text-gray-500">
        {/*  eslint-disable-next-line */}
        {new Date(comment?.createAt).toDateString()}
      </p>
    </div>
    {/* HEART */}

    <div className="relative group">
      <div
        className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs py-1 px-2 absolute top-12 right-0 rounded-full"
        style={{ zIndex: 9999, width: "65px" }}
      >
        {/*  eslint-disable-next-line */}
        Likes: {likes}
      </div>
      <button
        className="svg-heart rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 transition-transform transform active:scale-110"
        onClick={onLike}
      >
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5 transition-transform transform active:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
        </svg>
      </button>
    </div>
    {/* SAD */}
    <div className="relative group">
      <div
        className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs py-1 px-2 absolute top-12 right-0 rounded-full"
        style={{ zIndex: 9999, width: "85px" }}
      >
        {/*  eslint-disable-next-line */}
        Dislikes: {dislikes}
      </div>
      <button
        className="svg-sad flex ml-auto rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 transition-transform transform active:scale-110"
        onClick={onDislike}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5 transition-transform transform active:scale-110"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </button>
    </div>
  </div>
);

// eslint-disable-next-line
export default function CommentsSection({ book, setBook }) {
  // eslint-disable-next-line
  const [comments, setComments] = useState(book.comments);
  // eslint-disable-next-line
  const [likes, setLikes] = useState(book.likes);
  // eslint-disable-next-line
  const [dislikes, setDislikes] = useState(book.dislikes);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  const handleAddComment = async () => {
    if (newComment && username) {
      try {
        const _newComment = {
          comment: newComment,
          username,
          likes: 0,
          dislikes: 0,
        };
        // eslint-disable-next-line
        await createLike(book._id, _newComment);
        // eslint-disable-next-line
        const { data } = await findBookById(book._id);
        setBook(data);
        // eslint-disable-next-line
        // eslint-disable-next-line
        setComments(data.comments);
        setNewComment("");
        setUsername("");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleLike = async (index) => {
    const comment = comments[index];
    try {
      // eslint-disable-next-line
      // eslint-disable-next-line
      const { data: like } = await likeComment(book._id, comment._id);
      setLikes(like.comments[index].likes);
      // eslint-disable-next-line
      const { data } = await findBookById(book._id);
      setBook(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDislike = async (index) => {
    const comment = comments[index];
    try {
      // eslint-disable-next-line
      const { data: dislike } = await dislikeComment(book._id, comment._id);
      setDislikes(dislike.comments[index].dislikes);
      // eslint-disable-next-line
      const { data } = await findBookById(book._id);
      setBook(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="mt-8 space-y-4">
        <div className="flex items-start space-x-4">
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 bg-white-800 text-black border border-none-700 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="px-4 py-2 flex-1 bg-white-800 text-black border border-none-700 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleAddComment} className="btn-blue">
            Add Comment
          </button>
        </div>
        {/* eslint-disable-next-line */}
        {Array.isArray(comments) && comments.length > 0 ? (
          <div
            className="space-y-4"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              minHeight: "200px",
            }}
          >
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                onLike={() => handleLike(index)}
                onDislike={() => handleDislike(index)}
                dislikes={dislikes || comment.dislikes}
                likes={likes || comment.likes}
              />
            ))}
          </div>
        ) : (
          <> </>
        )}
      </div>
    </>
  );
}
