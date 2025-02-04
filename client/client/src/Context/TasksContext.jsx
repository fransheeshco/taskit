import React, { createContext, useReducer } from "react";

// Exporting constants along with component
export const TaskContext = createContext();
export const CREATE_TASK = "CREATE_TASK";
export const SET_TASKS = "SET_TASKS";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export function tasksReducer(state, action) {
  switch (action.type) {
    case CREATE_TASK: {
      return {
        tasks: [action.payload, ...state.tasks],
      };
    }
    case SET_TASKS: {
      return {
        tasks: action.payload,
      };
    }
    case DELETE_TASK: {
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

export default function TaskContextProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
  });

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
