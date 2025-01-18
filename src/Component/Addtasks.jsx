import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import database from "./firebaseConfig";
import { ref, push } from "firebase/database";

const Addtasks = ({ onAddTask }) => {
  const [tasks, setTasks] = useState("");
  const [description, setDescription] = useState("");

  const handleTheAddTasks = async () => {
    if (tasks.trim() === "") {
      toast.error("all tasks are required");
      return;
    }
    // Add task to the database
    try {
      const taskObject = { task: tasks, description: description };
      const tasksRef = ref(database, "tasks");
      await push(tasksRef, taskObject);
      toast.success("all task are added successfully");
      onAddTask(taskObject);
    } catch (error) {
      toast.error("something is wrong");
      console.log("error", error);
    }
    setTasks("");
    setDescription("");
    console.log(tasks, description);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Real Task Management</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new task"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleTheAddTasks}>
              Add Tasks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtasks;
