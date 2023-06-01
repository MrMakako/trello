import React from "react";
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

export default function Board_form(props) {
  const { title, childre, openPopup, setOpenPopup } = props;

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
                defaultValue="name"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
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
          >
            add
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}
