import axios from "axios";

export function createLike(bookId = "", data) {
  return axios.post(`http://localhost:3000/books/${bookId}/comment/`, {
    comment: data.comment,
    username: data.username,
    likes: data.likes,
    dislikes: data.dislikes,
    createAt: new Date(),
  });
}
