import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if(!context) {
        throw Error("useAuthContext must be used inside an UseContextProvider")
    }

    return context;
}