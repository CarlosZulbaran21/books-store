import axios from "axios";

export function filterByGenre(genre = "") {
  return axios.get("http://localhost:3000/books/filter/genre/" + genre);
}
