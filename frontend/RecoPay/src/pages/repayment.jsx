import { useContext } from "react";
import { LoanContext } from "../context/LoanContext";
import "./repayment.css";

function Repayment() {

    const { loans, payLoan } = useContext(LoanContext);

    // 🔥 HANDLE EMI PAYMENT
    const handlePayEMI = (loan, index) => {

        if (!loan.amount || loan.amount <= 0) {
            alert("Invalid loan");
            return;
        }

        const emi = Math.round(loan.amount / 12);

        const updatedPaid = (loan.paid || 0) + emi;

        const updatedLoan = {
            ...loan,
            paid: updatedPaid > loan.amount ? loan.amount : updatedPaid
        };

        updateLoan(index, updatedLoan);

        // 🔥 ADD TRANSACTION
        addTransaction({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            type: loan.type,
            category: "Repayment",
            amount: emi,
            status: "Success"
        });
    };

    return (
        <div className="repayment-container">

            <h1>Repayment Overview</h1>

            {/* 🔥 CARDS */}
            <div className="cards">

                <div className="card">
                    <p>Outstanding Balance</p>
                    <h2>
                        ₹{
                            loans.reduce(
                                (sum, l) => sum + (l.amount - (l.paid || 0)),
                                0
                            )
                        }
                    </h2>
                </div>

                <div className="card">
                    <p>Total Paid</p>
                    <h2>
                        ₹{
                            loans.reduce(
                                (sum, l) => sum + (l.paid || 0),
                                0
                            )
                        }
                    </h2>
                </div>

                <div className="card">
                    <p>Next EMI Due</p>
                    <h2>
                        ₹{
                            loans.length > 0
                                ? Math.round(loans[0].amount / 12)
                                : 0
                        }
                    </h2>
                </div>

            </div>

            {/* 🔥 TABLE */}
            <h3>EMI Schedule</h3>

            {loans.length === 0 ? (
                <p>No loans found</p>
            ) : (
                <table>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Loan Type</th>
                            <th>Total</th>
                            <th>EMI</th>
                            <th>Progress</th>
                            <th>Remaining</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loans.map((loan, index) => {

                            const amount = Number(loan.amount) || 0;
                            const paid = Number(loan.paid) || 0;

                            const emi = amount > 0 ? Math.round(amount / 12) : 0;

                            const totalEmi =
                                emi > 0 ? Math.ceil(amount / emi) : 0;

                            const paidEmi =
                                emi > 0 ? Math.floor(paid / emi) : 0;

                            const percent =
                                totalEmi > 0
                                    ? Math.round((paidEmi / totalEmi) * 100)
                                    : 0;

                            const remaining = amount - paid;

                            return (
                                <tr key={index}>

                                    <td>{index + 1}</td>
                                    <td>{loan.type}</td>
                                    <td>₹{amount}</td>
                                    <td>₹{emi}</td>

                                    {/* 🔥 PROGRESS */}
                                    <td>
                                        <div className="progress-bar">
                                            <div
                                                className="progress"
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                        <small>
                                            {paidEmi}/{totalEmi} EMI ({percent}%)
                                        </small>
                                    </td>

                                    <td>₹{remaining}</td>

                                    {/* 🔥 BUTTON */}
                                    <td>
                                        {remaining > 0 ? (
                                            <button
                                                className="pay-btn"
                                                onClick={() =>
                                                    handlePayEMI(loan, index)
                                                }
                                                disabled={amount === 0}
                                            >
                                                Pay EMI
                                            </button>
                                        ) : (
                                            <button className="paid-btn">
                                                Paid
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            )}

        </div>
    );
}

export default Repayment;