import { useState } from "react";
import useLogin from "../hooks/useLogin";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading} = useLogin()

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="d-flex flex-column border bg-info border-primary rounded p-3"
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) =>  setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button disabled={isLoading} className="btn btn-primary" type="submit">
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
}
