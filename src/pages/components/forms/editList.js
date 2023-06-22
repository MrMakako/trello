import { updateList } from "../../requests/list.request";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
export default function EditList(props) {
  const {
    listId,
    listName,
    setNewListName,
    showEditListPopup,
    setShowEditListPopup,
  } = props;
  function handleUpdateList() {
    updateList(listId, listName);
    console.log(listName, listId);
  }

  return (
    <Dialog
      open={showEditListPopup}
      onClose={() => setShowEditListPopup(false)}
    >
      <Button variant="contained" onClick={handleUpdateList}>
        <DialogTitle>save changes</DialogTitle>
      </Button>
      <DialogContent>
        <TextField
          label="List Name"
          value={listName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setShowEditListPopup(false)}>Cancel</Button>
        <Button
          onClick={() => {
            handleUpdateList();
            setShowEditListPopup(false);
            setNewListName("");
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
