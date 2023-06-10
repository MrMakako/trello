import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 1000,
});

function validateToken() {
  const token = localStorage.getItem("accessToken");
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
} //check if token had expired
export default async function sendRequestToken() {
  if (validateToken()) {
    const response = await Axios.get("/jwt/refresh", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });

    localStorage.setItem("accessToken", response.data.data.accessToken);
    console.log(response.data.data.accessToken);
  }

  //replace old acces token with new one
}
