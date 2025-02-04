import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TaskContextProvider from "./Context/TasksContext.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
