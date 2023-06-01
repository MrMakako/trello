import axios from "axios";
//in case of having any token
export function getBoards(email, setBoards) {
  axios
    .post("http://localhost:3006/boards/all", { email: email })
    .then((Response) => {
      console.log(Response.data);
      setBoards(Response.data[0]);
    });
}
