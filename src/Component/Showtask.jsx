import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const Showtask = ({ tasks, handleDeleteTask, handleEditClick }) => {
  const handleEditClicks = (task) => {
    const updatedTask = prompt("Enter new task name:", task.task);
    const updatedDescription = prompt(
      "Enter new task description:",
      task.description
    );

    if (updatedTask && updatedDescription) {
      const updatedData = {
        task: updatedTask,
        description: updatedDescription,
      };
      handleEditClick(task.id, updatedData);
    } else {
      alert("Both task name and description are required to update.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3 d-flex justify-content-between">
        <button className="btn btn-success">Show All Tasks</button>
        <button className="btn btn-primary">Delete All Tasks</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No tasks available
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditClicks(task)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showtask;
