import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <TaskForm />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            My Tasks
          </h2>

          <p>No tasks available</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;