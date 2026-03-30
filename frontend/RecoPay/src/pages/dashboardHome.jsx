import { useContext } from "react";
import { LoanContext } from "../context/LoanContext";

function DashboardHome() {

    const { loans } = useContext(LoanContext);

    const totalLoan = loans.reduce(
        (sum, loan) => sum + Number(loan.amount || 0),
        0
    );

    return (
        <div>
            <h1>Hi, User</h1>

            <div className="cards">
                <div className="card">
                    <p>Total Loans</p>
                    <h2>{loans.length}</h2>
                </div>

                <div className="card">
                    <p>Total Amount</p>
                    <h2>₹{totalLoan}</h2>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;