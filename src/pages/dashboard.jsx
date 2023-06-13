import axios from "axios";
import StackList from "./components/stack";
import { useState, useEffect } from "react";
import { getBoards } from "./requests/board.request";
import sendRequestToken from "./requests/jwt.request";
import PrimarySearchAppBar from "./components/navbar";
function Dashboard() {
  const [user_boards, setBoards] = useState([]);

  useEffect(() => {
    sendRequestToken().then((res) => {
      getBoards(setBoards);
    });
  }, []);

  return (
    <>
      <div>
        <header>{PrimarySearchAppBar()}</header>
        <h1>My Boards</h1>
        <div>{StackList(user_boards)}</div>
      </div>
    </>
  );
}

export default Dashboard;
