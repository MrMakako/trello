import { useState, useEffect, useRef, useMemo } from "react";
import "./dashboard_style.css";
import Popup from "./popup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

function Board() {
  const active = useRef(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [newTaskDesc, setNewTaskName] = useState("");

  function addTask(title, body) {
    const newTask = { id: tasks.length + 1, title, body, list: 1 };
    setTasks([...tasks, newTask]);
  }

  function handleSaveClick() {
    addTask("Name", newTaskDesc);
    setNewTaskName("");
  }

  const init = useMemo(() => {
    axios
      //
      .get("http://localhost:3006/cards", { params: { board_id: 1 } })
      .then((Response) => {
        console.log("SOLO UNA VEZ");
        // setTasks([]);
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

  function removeItem(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id);
    console.log(item);
  };
  async function storeCards() {
    //will delete all cards
    let myJson = [];

    for (let i = 0; i < tasks.length; i++) {
      const element = tasks[i];
      const newJson = {
        name: element.title,
        description: element.body,
        position: element.id,
        list_id: element.list,
      };

      myJson.push(newJson);
    }
    console.log(myJson);
    await axios.post("http://localhost:3006/cards", myJson);
  }

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
      <header>
        <h1>Your Project Manager</h1>
      </header>
      <body>
        <button className="delete-button" onClick={() => storeCards()}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <main>
          <div className="drag-and-drop">
            <div className="column column--1" draggable droppable="true">
              <div className="designed-container">
                <h3>Backlog</h3>
                <button
                  className="add-button"
                  onClick={() => setButtonPopup(true)}
                >
                  +
                </button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <div className="new-card-info">
                    <input
                      type="text"
                      className="large-input"
                      value={newTaskDesc}
                      onChange={(event) => setNewTaskName(event.target.value)}
                    />
                    <button className="btn-save" onClick={handleSaveClick}>
                      Save
                    </button>
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
                    <button
                      className="delete-button"
                      onClick={() => removeItem(item.id)}
                    >
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
                    <button
                      className="delete-button"
                      onClick={() => removeItem(item.id)}
                    >
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
                    <button
                      className="delete-button"
                      onClick={() => removeItem(item.id)}
                    >
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
                    <button
                      className="delete-button"
                      onClick={() => removeItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <strong className="title">{item.title}</strong>
                    <p className="body">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
export default Board;
