import axios from "axios";

export function findAllBooks() {
  return axios.get("http://localhost:3000/books");
}
