import axios from "axios";

export function dislikeComment(bookId = "", commentId = "") {
  return axios.patch(
    `http://localhost:3000/books/comment/dislike?bookId=${bookId}&commentId=${commentId}`
  );
}
