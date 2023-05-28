import axios from "axios";

async function registerUser(email, password) {
  axios
    .post("http://localhost:3006/user/register", {
      email: email,
      password: password,
    })
    .then((rs) => {
      console.log(rs);
    });
}

async function loginUser(email, password) {
  axios
    .post("http://localhost:3006/user/login", {
      email: email,
      password: password,
    })
    .then((rs) => {
      console.log(rs);
    });
}

export default {
  registerUser,
  loginUser,
};
/*
                              ⬛⬛⬛⬛⬛⬛
                            ⬛🟥🟥🟥🟥🟥🟥⬛
                       ⬛🟥🟥🟥🟥🟥🟥🟥🟥⬛
                      ⬛🟥🟥🟥🟥⬛⬛⬛⬛⬛⬛
                      ⬛🟥🟥🟥⬛🟦🟦⬜⬜⬜⬜⬛
                      ⬛🟥🟥⬛🟪🟦🟦🟦⬜⬜⬜🟦⬛
                ⬛⬛⬛🟥🟥⬛🟪🟦🟦🟦🟦🟦🟦🟦⬛
            ⬛🟥🟥⬛🟥🟥⬛🟪🟪🟪🟦🟦🟦🟦🟪⬛
            ⬛🟥🟥⬛🟥🟥🟥⬛🟪🟪🟪🟪🟪🟪⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
            ⬛🟥🟥⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
                ⬛⬛⬛🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛
                      ⬛🟥🟥🟥⬛⬛⬛⬛🟥🟥🟥⬛
                      ⬛🟥🟥🟥⬛       ⬛🟥🟥🟥⬛
                      ⬛🟥🟥🟥⬛       ⬛🟥🟥🟥⬛
                        ⬛⬛⬛             ⬛⬛⬛
*/
