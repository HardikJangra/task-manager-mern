import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [taskAction, setTaskAction] = useState("");
  const [fetchingTasks, setFetchingTasks] = useState(false);

  const fetchTasks = async () => {
    try {
      setFetchingTasks(true);
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch tasks"
      );
    } finally {
      setFetchingTasks(false);
    }
  };

  const deleteTask = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      return;
    }

    try {
      setLoadingTaskId(id);
      setTaskAction("delete");
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      await fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to delete task"
      );
    } finally {
      setLoadingTaskId(null);
      setTaskAction("");
    }
  };

  const toggleTask = async (id) => {
    try {
      setLoadingTaskId(id);
      setTaskAction("toggle");
      await api.patch(`/tasks/${id}/toggle`);
      toast.success("Task status updated");
      await fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to update task status"
      );
    } finally {
      setLoadingTaskId(null);
      setTaskAction("");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                My Tasks
              </h2>
              <p className="text-gray-600">
                Manage your task list and track progress.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full md:w-80 border rounded px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-sm text-gray-500">
                Total Tasks
              </p>
              <p className="text-3xl font-semibold mt-2">
                {totalTasks}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-sm text-gray-500">
                Completed Tasks
              </p>
              <p className="text-3xl font-semibold mt-2">
                {completedTasks}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-sm text-gray-500">
                Pending Tasks
              </p>
              <p className="text-3xl font-semibold mt-2">
                {pendingTasks}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {fetchingTasks ? (
              <p className="text-gray-600">
                Loading tasks...
              </p>
            ) : tasks.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 text-lg">
                  📝 No tasks yet. Create your first task above.
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 text-lg">
                  No tasks match your search.
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                  onEdit={setEditingTask}
                  isLoading={
                    loadingTaskId === task._id
                  }
                  loadingAction={taskAction}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;