import { NavLink } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleClick() {
    logout();
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary mb-2">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-light fs-2 ms-2" to="/">
            Task-It
          </NavLink>
          {user && (
            <div className="d-flex ms-auto justify-content-end">
              <span className="m-auto">{user.username}</span>
              {console.log(user)}
              <button
                className="btn text-light ms-2 border-light"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="d-flex justify-content-end">
              <NavLink className="navbar-brand text-light ms-2" to="/signup">
                Signup
              </NavLink>
              <NavLink className="navbar-brand text-light ms-2" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
