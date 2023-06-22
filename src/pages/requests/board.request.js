import axios from "axios";

//in case of having any token
const Axios = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 1000,
});

export function getBoards(setBoards) {
  console.log(localStorage.getItem("accessToken"));
  Axios.get("/boards/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((Response) => {
    console.log(Response.data[0]);
    setBoards(Response.data[0]);
  });
}
export function deleteBoard(board_id) {
  console.log(localStorage.getItem("accessToken"));
  Axios.delete("/boards/delete", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      board_id,
    },
  }).then((Response) => {
    console.log(Response.data);
    window.location.reload();
  });
}

export function addBoard(name, description) {
  const options = {
    method: "POST",
    url: "/boards/add",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    data: [
      {
        name: name,
        description: description,
      },
    ],
  };
  Axios.request(options);
}
