import axios from "axios";
import StackList from "./components/stack";
import { useState, useEffect } from "react";
function Dashboard() {
  const [user_boards, setBoards] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3006/boards", { params: { user_id: 1 } })
      .then((Response) => {
        console.log();
        console.log(Response.data);
        setBoards(Response.data[0]);
      });
  }, []);

  return (
    <>
      <div>
        <h1>My Boards</h1>
        <div>{StackList(user_boards)}</div>
      </div>
    </>
  );
}

export default Dashboard;
