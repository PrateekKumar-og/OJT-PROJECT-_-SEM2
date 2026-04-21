import { createContext, useState, useEffect } from "react";
import { applyLoan, getLoans, payEMI, deleteLoanAPI } from "../api/loan.api";
import { useAuth } from "./AuthContext";

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
    const { user } = useAuth();
    const userEmail = user?.email || "";

    // Transaction key per user
    const txKey = userEmail ? `transactions_${userEmail}` : "transactions";

    const [loans, setLoans] = useState([]);
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem(txKey);
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(true);

    // 🔹 FETCH USER'S LOANS FROM MONGODB
    useEffect(() => {
        if (userEmail) {
            fetchLoans();
        } else {
            setLoans([]);
            setLoading(false);
        }
    }, [userEmail]);

    // 🔹 RELOAD TRANSACTIONS WHEN USER CHANGES
    useEffect(() => {
        const saved = localStorage.getItem(txKey);
        setTransactions(saved ? JSON.parse(saved) : []);
    }, [txKey]);

    // 🔹 SAVE TRANSACTIONS TO LOCALSTORAGE (per user)
    useEffect(() => {
        localStorage.setItem(txKey, JSON.stringify(transactions));
    }, [transactions, txKey]);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const data = await getLoans(userEmail);
            setLoans(data);
        } catch (err) {
            console.error("Failed to fetch loans:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ ADD LOAN → MongoDB (with userEmail)
    const addLoan = async (loan) => {
        try {
            const newLoan = await applyLoan({ ...loan, userEmail });

            setLoans(prev => [newLoan, ...prev]);

            // CREDIT TRANSACTION (localStorage)
            addTransaction({
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                type: loan.type,
                category: "Loan",
                amount: Number(loan.amount),
                status: "Success"
            });

            return newLoan;
        } catch (err) {
            console.error("Failed to add loan:", err);
            throw err;
        }
    };

    // ✅ PAY EMI → MongoDB
    const payLoan = async (loanId) => {
        try {
            const updatedLoan = await payEMI(loanId);
            setLoans(prev =>
                prev.map(l => l._id === loanId ? updatedLoan : l)
            );
            return updatedLoan;
        } catch (err) {
            console.error("Failed to pay EMI:", err);
            throw err;
        }
    };

    // ✅ DELETE LOAN → MongoDB
    const deleteLoan = async (loanId) => {
        try {
            const loan = loans.find(l => l._id === loanId);
            await deleteLoanAPI(loanId);
            setLoans(prev => prev.filter(l => l._id !== loanId));

            // CANCELLATION TRANSACTION
            if (loan) {
                addTransaction({
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    type: loan.type,
                    category: "Cancelled",
                    amount: loan.amount - (loan.paid || 0),
                    status: "Cancelled"
                });
            }
        } catch (err) {
            console.error("Failed to delete loan:", err);
            throw err;
        }
    };

    // ✅ ADD TRANSACTION (localStorage only)
    const addTransaction = (tx) => {
        setTransactions(prev => [...prev, tx]);
    };

    // ✅ CLEAR ALL DATA
    const clearAllData = () => {
        setLoans([]);
        setTransactions([]);
        localStorage.removeItem(txKey);
    };

    return (
        <LoanContext.Provider value={{
            loans,
            loading,
            addLoan,
            payLoan,
            deleteLoan,
            transactions,
            addTransaction,
            clearAllData,
            fetchLoans
        }}>
            {children}
        </LoanContext.Provider>
    );
};