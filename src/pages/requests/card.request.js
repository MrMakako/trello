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
export function addMultipleCards(cardList, boardId) {
  const options = {
    method: "POST",
    url: "/cards/all",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      board_id: boardId,
    },
    data: cardList,
  };
  return Axios.request(options);
}
export function addCard(name, description, list_id, position) {
  const options = {
    method: "POST",
    url: "/cards/all",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    data: [
      {
        name,
        description,
        list_id,
        position,
      },
    ],
  };
  Axios.request(options);
}

export async function deleteCard(card_id) {
  console.log(localStorage.getItem("accessToken"));

  return await Axios.delete("/cards/delete", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    data: { card_id },
  });
}
