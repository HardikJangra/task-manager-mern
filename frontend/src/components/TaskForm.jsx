import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, { title, description });
        toast.success("Task updated");
        setEditingTask(null);
      } else {
        await api.post("/tasks", { title, description });
        toast.success("Task created");
      }

      await fetchTasks();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          {editingTask ? "Update task" : "New task"}
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
          {editingTask ? "Edit your task" : "Create a new task"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            disabled={loading}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
          <textarea
            placeholder="Describe the task in a few sentences"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {editingTask ? (loading ? "Updating..." : "Update task") : loading ? "Creating..." : "Create task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
