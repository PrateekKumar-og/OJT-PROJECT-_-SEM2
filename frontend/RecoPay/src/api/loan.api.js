const API_URL = "http://localhost:5000/api";

export const applyLoan = async (data) => {
    const res = await fetch(`${API_URL}/loans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to apply for loan");
    }

    return res.json();
};

export const getLoans = async () => {
    const res = await fetch(`${API_URL}/loans`);

    if (!res.ok) {
        throw new Error("Failed to fetch loans");
    }

    return res.json();
};
