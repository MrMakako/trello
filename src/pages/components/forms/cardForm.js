import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  TextField,
  colors,
  createTheme,
} from "@mui/material";
import { addBoard } from "../../requests/board.request";
export default function CardForm(props) {
  const { title, childre, openPopup, setOpenPopup } = props;
  const [name, setName] = useState(" ");
  const [desc, setDesc] = useState(" ");

  function handleOnSubmit(name, desc) {
    if (name !== "") {
      addBoard(name, desc);
      setOpenPopup(false);
    }
  }

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>New Table</div>
        <Box textAlign="right">
          {" "}
          <Button
            onClick={() => setOpenPopup(false)}
            sx={{
              color: "White",
              backgroundColor: colors.red[500],
            }}
          >
            x
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl>
          <Grid container direction={"column"} spacing={5} width={800}>
            <Grid item>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></TextField>
            </Grid>
            <Grid></Grid>
          </Grid>
          <Button
            sx={{
              color: "White",
              backgroundColor: colors.purple[500],
            }}
            fullWidth
            onClick={() => handleOnSubmit(name, desc)}
          >
            add
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
