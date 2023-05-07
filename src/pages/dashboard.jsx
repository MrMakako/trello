import { useState } from "react";
import "./dashboard_style.css";
import { Outlet } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const request = () => {
    axios
      .get("http://localhost:3006/boards", { params: { user_id: 1 } })
      .then((Response) => {
        console.log(Response.data);
      });
  };

  request();
  return <div></div>;
}

export default Dashboard;
