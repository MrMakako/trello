import { useState, useEffect, useRef, useMemo } from "react";
import "./dashboard_style.css";
import Popup from "./popup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Board() {
  const active = useRef(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 7,
      title: "Tarea 1",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 1,
      position: 3,
    },
    {
      id: 8,
      title: "Tarea 2",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 2,
    },
    {
      id: 9,
      title: "Tarea 3",
      body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.",
      list: 3,
    },
  ]);

  const init = useMemo(() => {
    axios
      //
      .get("http://localhost:3006/cards", { params: { board_id: 1 } })
      .then((Response) => {
        console.log("SOLO UNA VEZ");
        setTasks([]);
        //cambiar
        for (const key in Response.data[0]) {
          const element = Response.data[0][key];
          console.log(element);
          const newJson = {
            id: element.position,
            title: element.name,
            body: element.description,
            list: element.list_id,
          };
          setTasks((tasks) => [...tasks, newJson]);
        }
      });
  }, []);

  const getList = (list) => {
    return tasks.filter((item) => item.list === list);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id);
    console.log(item);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = (evt, list) => {
    // check if list is valid
    if (list < 1) {
      return;
    }

    const itemID = evt.dataTransfer.getData("itemID");
    const item = tasks.find((item) => item.id == itemID);
    const oldList = item.list;

    // get the index of the item being dragged
    const oldIndex = tasks.findIndex((item) => item.id == itemID);

    // get the new index of the item in the list
    const newIndex = Array.from(evt.target.parentNode.children).indexOf(
      evt.target
    );

    // remove the item from the old position
    tasks.splice(oldIndex, 1);

    // insert the item into the new position
    tasks.splice(newIndex, 0, item);

    // update the list property of the item
    item.list = list;

    // update the state with the new task list
    setTasks([...tasks]);
  };

  return (
    <>
      <div className="drag-and-drop">
        <div className="column column--1" draggable droppable="true">
          <div className="designed-container">
            <h3>Backlog</h3>
            <button className="add-button" onClick={() => setButtonPopup(true)}>
              +
            </button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="new-card-info">
                <input type="text" className="large-input" />
                <button className="btn-save">Save</button>
              </div>
            </Popup>
          </div>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, 1)}
          >
            {getList(1).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <button className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <strong className="title">{item.title}</strong>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="column column--2">
          <h3>To do</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, 2)}
          >
            {getList(2).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <button className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <strong className="title">{item.title}</strong>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="column column--3">
          <h3>In Progress</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, 3)}
          >
            {getList(3).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <button className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <strong className="title">{item.title}</strong>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="column column--4">
          <h3>Designed</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, 4)}
          >
            {getList(4).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <button className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <strong className="title">{item.title}</strong>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Board;
