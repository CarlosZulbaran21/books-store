import axios from "axios";

export function likeComment(bookId = "", commentId = "") {
  return axios.patch(
    `http://localhost:3000/books/comment/like?bookId=${bookId}&commentId=${commentId}`
  );
}
