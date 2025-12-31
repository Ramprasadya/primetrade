"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import { getToken } from "@/utils/auth";
import ProtectedRoute from "@/components/protectedRoute";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const token = getToken();

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks", headers);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return alert("Task title required");
    await api.post("/tasks", { title }, headers);
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, headers);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await api.put(
      `/tasks/${task._id}`,
      { completed: !task.completed },
      headers
    );
    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl mb-4">Your Tasks</h2>

        <input
          placeholder="Search tasks..."
          className="border px-4 py-2 rounded-md w-full mb-3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            className="border p-2 flex-1  px-4 py-2 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask} className="bg-blue-500 text-white cursor-pointer  px-4 py-2 rounded-md">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between border p-2"
            >
              <span
                onClick={() => toggleComplete(task)}
                className={task.completed ? "line-through cursor-pointer  px-4 py-2 rounded-md" : "cursor-pointer  px-4 py-2 rounded-md"}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 px-4 py-2 cursor-pointer"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
