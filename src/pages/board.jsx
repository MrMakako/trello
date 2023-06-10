import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./dashboard_style.css"; // Importar el archivo CSS con los estilos

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

export default function Board() {
  const [state, setState] = useState([]);

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const sList = state[sInd].items;
    const dList = state[dInd].items;

    if (sInd === dInd) {
      const items = reorder(sList, source.index, destination.index);
      const newState = [...state];
      newState[sInd].items = items;
      setState(newState);
    } else {
      const result = move(sList, dList, source, destination);
      const newState = [...state];
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];
      setState(newState);
    }
  }

  function handleListDelete(index) {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
  }

  function handleListNameEdit(index, newName) {
    const newState = [...state];
    newState[index].name = newName;
    setState(newState);
  }

  function handleEditMode(index, value) {
    const newState = [...state];
    newState[index].editMode = value;
    setState(newState);
  }

  return (
    <div className="board-container">
      <div className="title-container">
        <h1 className="title">Kanban Board</h1>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            setState([...state, { name: "New List", items: [] }]);
          }}
        >
          Add new list
        </button>
        {state.length > 0 && (
          <button
            type="button"
            onClick={() => {
              const newState = [...state];
              newState[0].items = [...newState[0].items, getItems(1)[0]];
              setState(newState);
            }}
          >
            Add new task
          </button>
        )}
      </div>
      <div className="content-container">
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {state.map((list, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={`list-container ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    }`}
                    {...provided.droppableProps}
                  >
                    <div className="list-header">
                      <h2 onClick={() => handleEditMode(ind, true)}>
                        {list.name}
                      </h2>
                      <div className="button-container-delete">
                        <button
                          type="button"
                          onClick={() => handleListDelete(ind)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {list.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className={`draggable-item ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <div className="content-container">
                              {item.content}
                              <button
                                type="button"
                                className="delete-button"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[ind].items.splice(index, 1);
                                  setState(
                                    newState.filter(
                                      (group) => group.items.length
                                    )
                                  );
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
