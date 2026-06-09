import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
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

  const user = JSON.parse(localStorage.getItem("user"));

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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                Welcome back, {user?.name || "there"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Your central workspace for tasks, progress, and productivity.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">Quick summary</p>
              <p className="mt-2 text-slate-600">You have {pendingTasks} pending tasks. Stay focused and completed more today.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <TaskForm
            fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Task overview</h2>
                <p className="mt-2 text-sm text-slate-600">Search and manage your tasks with clarity.</p>
              </div>
              <div className="relative max-w-md">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks by title or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Total Tasks</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{totalTasks}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Completed Tasks</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{completedTasks}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Pending Tasks</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">My tasks</h2>
              <p className="mt-2 text-sm text-slate-600">Keep track of your active and completed work in one place.</p>
            </div>
            <p className="text-sm text-slate-500">{filteredTasks.length} task{filteredTasks.length === 1 ? "" : "s"} shown</p>
          </div>

          <div className="mt-6">
            {fetchingTasks ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                Loading tasks...
              </div>
            ) : tasks.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
                <p className="text-lg font-semibold">📝 No tasks yet.</p>
                <p className="mt-2 text-sm text-slate-600">Create your first task above to get started.</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
                <p className="text-lg font-semibold">No matching tasks.</p>
                <p className="mt-2 text-sm text-slate-600">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                    onEdit={setEditingTask}
                    isLoading={loadingTaskId === task._id}
                    loadingAction={taskAction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
