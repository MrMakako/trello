import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddBox from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Board_form from "./board_form";
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

      <Board_form openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </AppBar>
  );
}
