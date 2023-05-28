import axios from "axios";

export async function registerUser(email, password) {
  axios
    .post("http://localhost:3006/user/register", {
      email: email,
      password: password,
    })
    .then((rs) => {
      console.log(rs);
    });
}

export async function loginUser(email, password) {
  axios
    .post("http://localhost:3006/user/login", {
      email: email,
      password: password,
    })
    .then((rs) => {
      console.log(rs);
    });
}

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
