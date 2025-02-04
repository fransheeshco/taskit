import "bootstrap/dist/css/bootstrap.min.css";
import useTasksContext from "../hooks/useTasksContext";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function TasksDetails({ task }) {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function onDelete() {
    if(!user) {
      return
    }
    try {
      const response = await fetch("http://localhost:4000/api/tasks/" + task._id, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_TASK", payload: task._id });
      } else {
        console.error("Failed to delete task:", json);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>{task.title}</h5>
        </div>
        <div className="col">
          <p>{task.description}</p>
        </div>
        <div className="col">
          <p>{task.dueDate}</p>
        </div>
        <div className="col">
          <button onClick={onDelete} className="btn btn-danger m-2">Delete</button>
        </div>
      </div>
    </div>
  );
}
