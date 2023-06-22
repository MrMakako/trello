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
  console.log("Posting");
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

export async function updateList(list_id, list_name) {
  console.log("Updating list");
  const options = {
    method: "PUT",
    url: "/lists/update",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    data: { list_id: list_id, list_name: list_name },
  };

  Axios.request(options).then((rs) => {
    window.location.reload();
  });
}
