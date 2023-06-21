import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBox from "@mui/icons-material/AddBox";

import BoardForm from "../components/forms/boardForm";
import { Button } from "@mui/material";
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
    <AppBar
      sx={{ background: "#222222", top: 0, position: "sticky", zIndex: 999 }}
    >
      <Toolbar>
        <Typography sx={{ color: "#ffffff" }}>Kanban.io</Typography>

        <Button
          sx={{
            marginLeft: "auto",
            backgroundColor: "#ff0000",
            color: "#ffffff",
          }}
          onClick={() => setOpenPopup(true)}
        >
          New Board
          <AddBox />
        </Button>

        <Button
          sx={{
            marginLeft: "10px",
            backgroundColor: "#0000ff", // Cambia el color de fondo del botón "Logout"
            color: "#ffffff", // Cambia el color del texto del botón "Logout"
          }}
          onClick={() => Logout()}
        >
          Log Out
          <LogoutIcon />
        </Button>
      </Toolbar>

      <BoardForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </AppBar>
  );
}
