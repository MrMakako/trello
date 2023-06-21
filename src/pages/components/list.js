import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deleteCard } from "../requests/card.request";

import React from "react";
export default function List(props) {
  const { columnId, column } = props;

  const deleteC = (card_id) => {
    console.log(card_id);
    deleteCard(card_id);
  };

  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
              padding: 4,
              width: 250,
              minHeight: 500,
            }}
          >
            {column.items.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: 16,
                          margin: "0 0 8px 0",
                          minHeight: "50px",
                          backgroundColor: snapshot.isDragging
                            ? "#263B4A"
                            : "#456C86",
                          color: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                        <IconButton onClick={() => deleteC(item.id)}>
                          <Delete />
                        </IconButton>
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}
