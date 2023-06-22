import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { colors } from "@mui/material";
import { deleteBoard } from "../requests/board.request";
import { Link, useNavigate } from "react-router-dom";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

const styles = {
  "&:hover": {
    color: "black",
  },
};

function goToBoard(board_id, board_name, navigate) {
  navigate("/dashboard/" + board_name + "?board_id=" + board_id);

  console.log(board_id);
}

const deleteB = (board_id) => {
  console.log(board_id);
  deleteBoard(board_id);
};

function createCard(board_name, board_id, navigate) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {board_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            ...styles,
            color: "white",
            backgroundColor: colors.purple[500],
          }}
          size="big"
          onClick={() => {
            goToBoard(board_id, board_name, navigate);
          }}
        >
          Go
        </Button>
        <Button
          sx={{ ...styles, color: "White", backgroundColor: colors.green[500] }}
          size="m"
        >
          Edit
        </Button>{" "}
        <Button
          sx={{ ...styles, color: "White", backgroundColor: colors.red[500] }}
          size="m"
          onClick={() => deleteB(board_id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
function Pile(user_boards) {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {user_boards.map((data) => (
          <>{createCard(data.name, data.id, navigate)}</>
        ))}
      </Stack>
    </Box>
  );
}

export default function StackList(user_boards) {
  return <>{Pile(user_boards)}</>;
}
