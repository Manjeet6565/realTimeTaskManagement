import React, { useEffect, useState } from "react";
import Addtasks from "./Component/Addtasks";
import Showtask from "./Component/Showtask";
import { onValue, ref, remove, update } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import database from "./Component/firebaseConfig";
const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };
  useEffect(() => {
    const taskRef = ref(database, "tasks");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const taskRef = ref(database, `tasks/${id}`);
      console.log("Deleting task at path:", `tasks/${id}`);
      await remove(taskRef);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting task:", error.message);
      toast.error("Error deleting task");
    }
  };

  const handleEditClick = async (id, updatedData) => {
    try {
      const taskRef = ref(database, `tasks/${id}`);
      console.log("Editing task at path:", `tasks/${id}`);
      console.log("Updated data:", updatedData);

      await update(taskRef, updatedData);
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error updating task:", error);
      toast.error("Error updating task");
    }
  };

  return (
    <div className="container mt-5">
      <Addtasks onAddTask={handleAddTask} />
      <Showtask
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleEditClick={handleEditClick}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
