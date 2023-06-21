import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  colors,
} from "@mui/material";
import { addCard } from "../../requests/card.request";

export default function CardForm(props) {
  const { listId, position, openPopup, setOpenPopup } = props;
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");

  const handleOnSubmit = (name, description) => {
    if (name !== "") {
      console.log(name, description, listId, position);
      addCard(name, description, listId, position);
      setOpenPopup(false);
    }
  };

  const handleSubmit = () => {
    handleOnSubmit(name, description);
  };

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>New Card</div>
        <Box textAlign="right">
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
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
          <Button
            sx={{
              color: "White",
              backgroundColor: colors.purple[500],
            }}
            fullWidth
            onClick={handleSubmit}
          >
            Add
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
