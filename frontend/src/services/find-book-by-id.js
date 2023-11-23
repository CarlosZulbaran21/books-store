import axios from "axios";

export function findBookById(id = "") {
  return axios.get("http://localhost:3000/books/" + id);
}
