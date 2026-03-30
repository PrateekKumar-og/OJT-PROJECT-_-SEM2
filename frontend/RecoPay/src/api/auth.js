const API = "http://localhost:5000/api/auth";

export const signupUser = async (data) => {
    const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const getMe = async (token) => {
    const res = await fetch(`${API}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
};