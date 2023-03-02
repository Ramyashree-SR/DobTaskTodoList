import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import "./todolist.css";

function TodoList() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [checked, setchecked] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("LocalTasks")) {
      const storedData = JSON.parse(localStorage.getItem("LocalTasks"));
      setToDo(storedData);
    }
  }, []);

  //Add Task
  const addTodoData = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      localStorage.setItem("LocalTasks", JSON.stringify([...toDo, newEntry]));
      setNewTask("");
    }
  };

  // Delete task
  const deleteTodoData = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
    localStorage.setItem("LocalTasks", JSON.stringify(newTasks));
  };

  const taskCompleted = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTasks);
    setchecked(!checked);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
    // localStorage.setItem("LocalTasks", JSON.stringify([...toDo, newEntry]));
  };

  // update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    localStorage.setItem("LocalTasks", JSON.stringify(updatedObject));
    setUpdateData("");
  };

  const onHandlecClearData = () => {
    setToDo([]);
    localStorage.removeItem("LocalTasks");
  };

  return (
    <div className="mainDiv">
      <div>
        {/* <img src="./assets/bg1.jpg" alt="nature" /> */}
        <br />
        <h2 className="text-danger  text-align-center">
          Todo List Application (React Js)
        </h2>
        <br />

        {updateData && updateData ? (
          <>
            <div className="row">
              <div className="col">
                <input
                  value={updateData && updateData.title}
                  onChange={(e) => changeTask(e)}
                  className="insidediv w-100 h-100"
                />
              </div>

              <div className="col-auto">
                <button
                  className="btn h-20 btn-success mr-0"
                  onClick={updateTask}
                >
                  Update
                </button>
                <button className="btn btn-warning h-20" onClick={cancelUpdate}>
                  Cancel
                </button>
              </div>
            </div>
            <br />
          </>
        ) : (
          <>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="mainbox w-100 h-100"
                />
              </div>

              <div className="col-auto">
                <button
                  className="btn btn-warning h-10 w-100"
                  onClick={addTodoData}
                >
                  <AddCircleIcon color="warning" /> Add Task
                </button>
              </div>
            </div>
            <br />
          </>
        )}
        {toDo && toDo.length ? "" : "No tasks..."}

        {toDo &&
          toDo
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              return (
                <div key={task.id}>
                  <div className="col taskBg">
                    <div className={task.status ? "done" : ""}>
                      <div className="d-flex">
                        <span className="taskNumber">{index + 1}</span>
                        <p className="taskText">{task.title}</p>
                      </div>
                    </div>

                    <div className="iconsWrap">
                      <span
                        onClick={(e) => taskCompleted(task.id)}
                        title="Task Done / Not Completed"
                      >
                        {checked ? (
                          <CheckCircleIcon />
                        ) : (
                          <SettingsBackupRestoreIcon color="warning" />
                        )}
                      </span>

                      {task.status ? null : (
                        <span
                          title="Edit"
                          onClick={() =>
                            setUpdateData({
                              id: task.id,
                              title: task.title,
                              status: task.status ? true : false,
                            })
                          }
                        >
                          <ModeEditIcon />
                        </span>
                      )}

                      <span
                        onClick={() => deleteTodoData(task.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        <div>
          <button
            className="btn btn-warning h-10 w-100"
            onClick={onHandlecClearData}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
