import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddBox from "@mui/icons-material/AddBox";

import BoardForm from "../components/forms/boardForm";
import { Button, Tab, Tabs } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
export default function PrimarySearchAppBar() {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  function Logout() {
    localStorage.clear();
    navigate("/", { replace: true });
  }
  return (
    <AppBar sx={{ background: "#753E7F" }}>
      <Toolbar>
        <Typography>Kanban.io</Typography>

        <Button sx={{ marginLeft: "auto" }} onClick={() => setOpenPopup(true)}>
          New Board
          <AddBox />
        </Button>

        <Button sx={{ marginLeft: "10px" }} onClick={() => Logout()}>
          Log Out
          <LogoutIcon />
        </Button>
      </Toolbar>

      <BoardForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </AppBar>
  );
}
