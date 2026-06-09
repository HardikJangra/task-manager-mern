import {
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

import api from "../services/api";

function TaskForm({
  fetchTasks,
  editingTask,
  setEditingTask,
}) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(
        editingTask.description
      );
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
        await api.put(
          `/tasks/${editingTask._id}`,
          {
            title,
            description,
          }
        );

        toast.success("Task updated");
        setEditingTask(null);
      } else {
        await api.post("/tasks", {
          title,
          description,
        });

        toast.success("Task created");
      }

      await fetchTasks();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {editingTask
          ? "Edit Task"
          : "Create Task"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
          disabled={loading}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded disabled:opacity-70"
        >
          {editingTask
            ? loading
              ? "Updating..."
              : "Update Task"
            : loading
            ? "Creating..."
            : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;