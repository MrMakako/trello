import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Pile(user_boards) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {user_boards.map((data) => (
          <Button>r_id}
          </Button>
        ))}
            {data.id}-{data.name} creado por:{data.use
      </Stack>
    </Box>
  );
}

export default function StackList(user_boards) {
  return <>{Pile(user_boards)}</>;
}
