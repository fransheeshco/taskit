import { useEffect } from "react";
import useTasksContext from "../hooks/useTasksContext.jsx";
import TasksDetails from "../components/TasksDetails.jsx";
import useAuthContext from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Root() {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tasks/", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_TASKS", payload: json });
        } else {
          console.error("Failed to fetch tasks:", json);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="container">
      <div className="tasks">
        <div className="row text-bg-primary">
          <div className="col">
            <h2>TITLE</h2>
          </div>
          <div className="col">
            <h2>DESCRIPTION</h2>
          </div>
          <div className="col">
            <h2>DUE DATE</h2>
          </div>
          <div className="col">
            <h2>DELETE</h2>
          </div>
        </div>
        {tasks &&
          tasks.map((task) => <TasksDetails key={task._id} task={task} />)}
      </div>
      <div className="d-flex justify-content-end fixed-bottom p-5">
        <Link to="/create">
          <button type="button" className="btn btn-primary rounded-pill">
            ADD NEW TASK
          </button>
        </Link>
      </div>
    </div>
  );
}
