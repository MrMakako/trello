import axios from "axios";

//in case of having any token
const Axios = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 1000,
});

export async function getCards(board_id) {
  console.log(localStorage.getItem("accessToken"));
  return await Axios.get("/cards/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      board_id: board_id,
    },
  });
}

export function addCard(name, desc, list_id, position) {
  const options = {
    method: "POST",
    url: "/cards/add",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    data: [
      {
        name,
        desc,
        list_id,
        position,
      },
    ],
  };
  Axios.request(options);
}
