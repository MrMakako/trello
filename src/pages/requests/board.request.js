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
    console.log(Response.data);
    setBoards(Response.data[0]);
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
