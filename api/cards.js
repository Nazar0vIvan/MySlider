import axios from "axios";

export async function getCards(options) {
  return axios
    .get("./api/db.json", options)
    .then((response) => response.data.cards);
}
