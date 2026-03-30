import { createContext, useState } from "react";

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {

    const [loans, setLoans] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [tickets, setTickets] = useState([]);

    // ADD LOAN
    const addLoan = (loan) => {
        setLoans((prev) => [...prev, loan]);
    };

    // PAY LOAN
    const payLoan = (id, amount) => {
        setLoans((prev) =>
            prev.map((loan) =>
                loan.id === id
                    ? { ...loan, paid: (loan.paid || 0) + amount }
                    : loan
            )
        );
    };

    // ADD TRANSACTION
    const addTransaction = (tx) => {
        setTransactions((prev) => [tx, ...prev]);
    };

    // ADD TICKET
    const addTicket = (data) => {
        const newTicket = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            ...data,
            status: "Open"
        };

        setTickets((prev) => [newTicket, ...prev]);
    };

    // 🔥 RESOLVE TICKET
    const resolveTicket = (id) => {
        setTickets((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: "Resolved" } : t
            )
        );
    };

    return (
        <LoanContext.Provider value={{
            loans,
            addLoan,
            payLoan,
            transactions,
            addTransaction,
            tickets,
            addTicket,
            resolveTicket   // ✅ important
        }}>
            {children}
        </LoanContext.Provider>
    );
};