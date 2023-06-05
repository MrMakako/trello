import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function createCard(board_name) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {board_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="big">Go</Button>
      </CardActions>
    </Card>
  );
}
function Pile(user_boards) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {user_boards.map((data) => (
          <>{createCard(data.name)}</>
        ))}
      </Stack>
    </Box>
  );
}

export default function StackList(user_boards) {
  return <>{Pile(user_boards)}</>;
}
