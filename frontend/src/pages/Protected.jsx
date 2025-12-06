import { useEffect, useState } from "react";

function Protected() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        fetch("/api/protected/", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("Failed to load"));
    }, []);

    return <h2>{message}</h2>;
}

export default Protected;
