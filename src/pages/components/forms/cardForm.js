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
import { useSearchParams } from "react-router-dom";
export default function CardForm(props) {
  const { listId, position, addCard, openPopup, setOpenPopup, Load, Save } =
    props;
  const [name, setName] = useState("");
  const [searchParams] = useSearchParams();
  //addCard en una funcion para agrear las cards en memoria
  const [description, setdescription] = useState("");
  function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const random = Math.random().toString(36).substring(2, 8); // Generate random string

    return `${timestamp}-${random}`;
  }
  const handleOnSubmit = (name, description) => {
    if (name !== "") {
      console.log(name, description, listId, position);
      addCard({
        id: generateUniqueId(),
        name: name,
        content: description,
        list_id: listId,
      });
      setOpenPopup(false);
      Save().then((rs) => {
        Load(searchParams.get("board_id"));
      });
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
            //Esete hadleSumbmt agregara a la lista.
          >
            Add
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
