import { createContext, useState, useEffect } from "react";

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {

    // 🔹 LOAD LOANS
    const [loans, setLoans] = useState(() => {
        const saved = localStorage.getItem("loans");
        return saved ? JSON.parse(saved) : [];
    });

    // 🔹 LOAD TRANSACTIONS
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    // 🔹 SAVE
    useEffect(() => {
        localStorage.setItem("loans", JSON.stringify(loans));
    }, [loans]);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // ✅ ADD LOAN
    const addLoan = (loan) => {
        const newLoan = {
            ...loan,
            id: Date.now(),
            amount: Number(loan.amount),
            duration: Number(loan.duration),
            paid: 0,
            status: "Active",
            createdAt: new Date().toISOString()
        };

        setLoans(prev => [...prev, newLoan]);

        // 🔥 CREDIT TRANSACTION
        addTransaction({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            type: loan.type,
            category: "Loan",
            amount: newLoan.amount,
            status: "Success"
        });
    };

    // ✅ PAY EMI
    const payLoan = (index) => {
        setLoans(prev =>
            prev.map((loan, i) => {
                if (i !== index) return loan;

                const emi = Math.ceil(loan.amount / (loan.duration || 12));
                let updatedPaid = (loan.paid || 0) + emi;

                if (updatedPaid >= loan.amount) {
                    updatedPaid = loan.amount;
                }

                return {
                    ...loan,
                    paid: updatedPaid,
                    status: updatedPaid >= loan.amount ? "Completed" : "Active"
                };
            })
        );
    };

    // ✅ DELETE LOAN
    const deleteLoan = (index) => {
        const loan = loans[index];
        setLoans(prev => prev.filter((_, i) => i !== index));

        // Add cancellation transaction
        addTransaction({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            type: loan.type,
            category: "Cancelled",
            amount: loan.amount - (loan.paid || 0),
            status: "Cancelled"
        });
    };

    // ✅ UPDATE LOAN STATUS
    const updateLoanStatus = (index, newStatus) => {
        setLoans(prev =>
            prev.map((loan, i) => {
                if (i !== index) return loan;
                return { ...loan, status: newStatus };
            })
        );
    };

    // ✅ ADD TRANSACTION
    const addTransaction = (tx) => {
        setTransactions(prev => [...prev, tx]);
    };

    // ✅ CLEAR ALL DATA
    const clearAllData = () => {
        setLoans([]);
        setTransactions([]);
        localStorage.removeItem("loans");
        localStorage.removeItem("transactions");
    };

    return (
        <LoanContext.Provider value={{
            loans,
            addLoan,
            payLoan,
            deleteLoan,
            updateLoanStatus,
            transactions,
            addTransaction,
            clearAllData
        }}>
            {children}
        </LoanContext.Provider>
    );
};