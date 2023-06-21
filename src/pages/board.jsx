import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import List from "./components/list";
import { getLists } from "./requests/list.request";
import { getCards } from "./requests/card.request";
import { useSearchParams, useParams } from "react-router-dom";
import CardForm from "./components/forms/cardForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

const taskStatus = {};

export default function Board() {
  const [columns, setColumns] = useState(taskStatus);
  const [showAddListPopup, setShowAddListPopup] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  //No se si es es necesario //
  const [formListId, setFormListId] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const { main_board_name } = useParams();
  const [searchParams] = useSearchParams();

  const [list, setList] = useState([]);

  //to add cards in memory
  function addCard(item) {
    // Find the corresponding item in taskStatus
    const col = columns[item.list_id];
    console.log(col);
    // Push the task to the items array of the identified item
    col.items.push(item);
  }
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      }));
    }
  };

  async function load(board_id) {
    console.log("username:" + main_board_name);
    const Lists = await getLists(board_id);
    const Cards = await getCards(board_id);
    console.log(Cards.data);
    const newColumns = {};

    Lists.data.forEach((item) => {
      const newCard = [];
      console.log(item);
      Cards.data.forEach((card) => {
        if (card.list_id === item.id) {
          newCard.push({
            id: card.id.toString(),
            name: card.name,
            content: card.description,
          });
        }
      });
      newColumns[item.id] = {
        name: item.name,
        items: newCard,
      };
      console.log(newColumns);
      console.log(newCard);
    });

    setList(Lists.data);

    setColumns({ ...columns, ...newColumns });
  }
  const init = useEffect(() => {
    load(searchParams.get("board_id"));
  }, []);

  useEffect(() => {
    console.log(columns);
  });

  const addList = () => {
    setShowAddListPopup(true);
  };

  const handleAddList = (name) => {
    const newList = {
      id: Date.now().toString(),
      name: name,
      items: [],
    };
    setColumns((prevColumns) => ({
      ...prevColumns,
      [newList.id]: newList,
    }));
  };

  const addTask = (columnId, position) => {
    setOpenPopup(true);
    setFormListId(columnId);
    setFormPosition(position);
  };

  const handleOnSubmit = (name, description) => {
    if (name !== "") {
      const newCard = {
        id: Date.now().toString(),
        content: name,
      };

      setColumns((prevColumns) => {
        const column = prevColumns[formListId];
        const updatedItems = [...column.items];
        updatedItems.splice(formPosition, 0, newCard);

        return {
          ...prevColumns,
          [formListId]: {
            ...column,
            items: updatedItems,
          },
        };
      });

      setOpenPopup(false);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{main_board_name}</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "inline-block" }}>
          <Button
            variant="contained"
            sx={{
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#0000CC",
              },
            }}
            onClick={addList}
          >
            Add List
          </Button>
        </Box>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <List columnId={columnId} column={column}></List>
                </div>
                <Button
                  onClick={() => addTask(columnId, column.items.length + 1)}
                >
                  <AddBoxIcon />
                </Button>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <CardForm
        listId={formListId}
        position={formPosition}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        onSubmit={handleOnSubmit}
        addCard={addCard}
      />

      <Dialog
        open={showAddListPopup}
        onClose={() => setShowAddListPopup(false)}
      >
        <Button variant="contained" onClick={addList}>
          <DialogTitle>Add New List</DialogTitle>
        </Button>
        <DialogContent>
          <TextField
            label="List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddListPopup(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddList(newListName);
              setShowAddListPopup(false);
              setNewListName("");
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
