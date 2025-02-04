import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext.jsx";
import Task from "./components/Task.jsx";
import Root from "./pages/Root.jsx";
import NavBar from "./components/NavBar.jsx";
import TasksDetails from "./components/TasksDetails.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <Root /> :  <Navigate to="login"/>}></Route>
              <Route path="/create" element={<Task />}></Route>
              <Route path="/details" element={<TasksDetails />}></Route>
              <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/"/> }></Route>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>  }></Route>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}
