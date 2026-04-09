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
            amount: Number(loan.amount),
            duration: Number(loan.duration),
            paid: 0
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

    // ✅ PAY EMI (FIXED LOGIC)
    const payLoan = (index) => {

        setLoans(prev =>
            prev.map((loan, i) => {
                if (i !== index) return loan;

                const emi = Math.ceil(loan.amount / loan.duration);

                let updatedPaid = (loan.paid || 0) + emi;

                // ✅ FORCE COMPLETE
                if (updatedPaid >= loan.amount) {
                    updatedPaid = loan.amount;
                }

                return {
                    ...loan,
                    paid: updatedPaid
                };
            })
        );
    };

    // ✅ ADD TRANSACTION
    const addTransaction = (tx) => {
        setTransactions(prev => [...prev, tx]);
    };

    return (
        <LoanContext.Provider value={{
            loans,
            addLoan,
            payLoan,
            transactions,
            addTransaction
        }}>
            {children}
        </LoanContext.Provider>
    );
};