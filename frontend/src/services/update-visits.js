import axios from "axios";

export function updateVisitsById(id = "") {
  return axios.patch("http://localhost:3000/books/visits/" + id);
}
