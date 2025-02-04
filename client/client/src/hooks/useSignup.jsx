import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default function useSignup() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    async function signup(username, email, password) {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}
