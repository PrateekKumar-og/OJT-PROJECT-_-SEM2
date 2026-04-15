const API_URL = "https://recopay.onrender.com/api";

// RETRY WRAPPER — Render free tier sleeps, so retry on failure
const fetchWithRetry = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res;
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
};

// CREATE LOAN
export const applyLoan = async (data) => {
    const res = await fetchWithRetry(`${API_URL}/loans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// GET ALL LOANS
export const getLoans = async () => {
    const res = await fetchWithRetry(`${API_URL}/loans`);
    return res.json();
};

// PAY EMI
export const payEMI = async (id) => {
    const res = await fetchWithRetry(`${API_URL}/loans/${id}/pay`, {
        method: "PUT",
    });
    return res.json();
};

// DELETE LOAN
export const deleteLoanAPI = async (id) => {
    const res = await fetchWithRetry(`${API_URL}/loans/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
