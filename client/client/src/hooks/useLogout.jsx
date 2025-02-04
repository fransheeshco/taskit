import useAuthContext from "./useAuthContext";
import useTasksContext from "./useTasksContext";

export default function useLogout() {
    const { dispatch } = useAuthContext();
    const { dispatch: tasksDispatch } = useTasksContext();

    function logout() {
        // remove user from storage
        localStorage.removeItem('user')

        dispatch({type: "LOGOUT"})
        tasksDispatch({type: "SET_TASKS", payload: null })
    }

    return {logout};
}