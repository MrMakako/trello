import axios from "axios";

export default async function registerUser(email, password) {
  axios
    .post("http://localhost:3006/user/register", {
      email: email,
      password: password,
    })
    .then((rs) => {
      console.log(rs);
    });
}
