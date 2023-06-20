import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import List from "./components/list";
import { getLists } from "./requests/list.request";
import { getCards } from "./requests/card.request";
import { Button, ListItem } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useSearchParams, useParams } from "react-router-dom";
import CardForm from "./components/forms/cardForm";

const taskStatus = {
  requested: {
    name: "Backlog",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function Board() {
  const { main_board_name } = useParams();
  const [searchParams] = useSearchParams();
  const [openPopup, setOpenPopup] = useState(false);

  const [columns, setColumns] = useState(taskStatus);
  const [list, setList] = useState([]);

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
    const newList = {
      id: Date.now().toString(),
      name: "New List",
      items: [],
    };
    setColumns((prevColumns) => ({
      ...prevColumns,
      [newList.id]: newList,
    }));
  };

  const addTask = (columnId) => {
    const newCard = {
      id: Date.now().toString(),
      content: "new card",
    };

    setColumns((prevColumns) => {
      const column = prevColumns[columnId];
      const updatedItems = [...column.items, newCard];

      return {
        ...prevColumns,
        [columnId]: {
          ...column,
          items: updatedItems,
        },
      };
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{main_board_name}</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={addList}>Add List</Button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
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
                  onClick={() => {
                    addTask(columnId);
                    setOpenPopup(true);
                  }}
                >
                  <AddBoxIcon />
                </Button>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <CardForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  );
}
