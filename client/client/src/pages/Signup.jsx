import { useState } from "react";
import useSignup from "../hooks/useSignup";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, email, password } = form;
    await signup(username, email, password);
  }

  function updateForm(updatedValue) {
    setForm((prev) => ({
      ...prev,
      ...updatedValue,
    }));
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="d-flex flex-column border bg-info border-primary rounded p-3"
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            className="form-control"
            type="text"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            className="form-control"
            type="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <button disabled={isLoading} className="btn btn-primary" type="submit">
          Submit
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}
