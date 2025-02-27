import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CsrfContext = createContext(null);

export const useCsrf = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        axios
            .get("/csrftoken.html", { withCredentials: true })
            .then((response) => {
                setCsrfToken(response.data.csrf_token); // Убедись, что JSON-ответ содержит csrf_token
            })
            .catch((error) => console.error("Ошибка получения CSRF-токена:", error));
    }, []);

    return (
        <CsrfContext.Provider value={csrfToken}>
            {children}
        </CsrfContext.Provider>
    );
};
