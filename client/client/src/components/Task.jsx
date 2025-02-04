import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import useTasksContext from "../hooks/useTasksContext";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Task() {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  function updateForm(updatedValue) {
    setForm((prev) => ({
      ...prev,
      ...updatedValue,
    }));
  }

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    if (!user) {
      return;
    }
    const task = { ...form };

    try {
      const response = await fetch("http://localhost:4000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log("Task successfully added!");
        setForm({
          title: "",
          description: "",
          dueDate: "",
        });
        dispatch({ type: "CREATE_TASK", payload: response });
        navigate("/");
      } else {
        console.error("Failed to add task");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1 className="text-bg-primary p-3">ADD NEW TASK</h1>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-6">
            <legend>Title</legend>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Complete Project Proposal"
              className="form-control form-control-lg"
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
            />
          </div>
          <div className="col">
            <legend>Due Date</legend>
            <input
              type="date"
              id="duedate"
              name="duedate"
              className="form-control form-control-lg mb-5"
              value={form.dueDate}
              onChange={(e) => updateForm({ dueDate: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <legend>Description</legend>
            <textarea
              id="description"
              name="description"
              placeholder="Create and Complete Project Proposal for School"
              className="form-control form-control-lg"
              rows="4" // Adjust rows as needed
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
            />
          </div>

          <div className="col-6">
            <button
              type="submit"
              className="btn btn-primary mt-5 btn-lg col-12 "
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
