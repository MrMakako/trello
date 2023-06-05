import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 1000,
});

export default async function sendRequestToken() {
  const response = await Axios.get("/jwt/refresh", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
    },
  });

  localStorage.setItem("accessToken", response.data.data.accessToken);
  console.log(response.data.data.accessToken);
  //replace old acces token with new one
}
