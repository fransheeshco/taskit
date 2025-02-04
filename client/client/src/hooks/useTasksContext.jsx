import { TaskContext } from "../Context/TasksContext";
import { useContext } from "react";

export default function useTasksContext() {
    const context = useContext(TaskContext);

    if(!context) {
        throw Error("useTasksContext must be used inside an TaskContextProvider")
    }

    return context;
}