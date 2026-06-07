import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <TaskForm
          fetchTasks={fetchTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            My Tasks
          </h2>

          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
                onEdit={setEditingTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;