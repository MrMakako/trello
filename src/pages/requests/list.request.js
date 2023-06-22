import axios from "axios";

//in case of having any token
const Axios = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 1000,
});

export async function getLists(board_id) {
  console.log(localStorage.getItem("accessToken"));
  return await Axios.get("/lists/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      board_id: board_id,
    },
  });
}

export async function addNewLists(board) {
  console.log("Agregando");
  const options = {
    method: "POST",
    url: "/lists/new",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    data: board,
  };

  Axios.request(options).then((rs) => {
    window.location.reload();
  });
}
