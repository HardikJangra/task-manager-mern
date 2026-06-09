function TaskCard({ task, onDelete, onToggle, onEdit, isLoading, loadingAction }) {
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{task.description}</p>
          {formattedDate && (
            <p className="mt-4 text-sm text-slate-500">Created: {formattedDate}</p>
          )}
        </div>

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
            task.completed
              ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => onEdit(task)}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Edit
        </button>

        <button
          onClick={() => onToggle(task._id)}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading && loadingAction === "toggle" ? "Toggling..." : "Toggle Status"}
        </button>

        <button
          onClick={() => onDelete(task._id)}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading && loadingAction === "delete" ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
