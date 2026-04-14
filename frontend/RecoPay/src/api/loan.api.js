const API_URL = "https://recopay.onrender.com/api";

// CREATE LOAN
export const applyLoan = async (data) => {
    const res = await fetch(`${API_URL}/loans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to apply for loan");
    return res.json();
};

// GET ALL LOANS
export const getLoans = async () => {
    const res = await fetch(`${API_URL}/loans`);
    if (!res.ok) throw new Error("Failed to fetch loans");
    return res.json();
};

// PAY EMI
export const payEMI = async (id) => {
    const res = await fetch(`${API_URL}/loans/${id}/pay`, {
        method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to pay EMI");
    return res.json();
};

// DELETE LOAN
export const deleteLoanAPI = async (id) => {
    const res = await fetch(`${API_URL}/loans/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete loan");
    return res.json();
};
