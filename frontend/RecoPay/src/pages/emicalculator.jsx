import { useState } from "react";
import "./emicalculator.css";

function EMICalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [result, setResult] = useState(null);

    const calculateEMI = () => {
        const P = Number(amount);
        const R = Number(rate) / 12 / 100; // monthly rate
        const N = Number(tenure);

        if (!P || !R || !N || P <= 0 || N <= 0) {
            return;
        }

        // EMI = P × R × (1+R)^N / ((1+R)^N - 1)
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayment = emi * N;
        const totalInterest = totalPayment - P;

        // Monthly breakdown
        const schedule = [];
        let balance = P;
        for (let i = 1; i <= N; i++) {
            const interestPart = balance * R;
            const principalPart = emi - interestPart;
            balance -= principalPart;

            schedule.push({
                month: i,
                emi: Math.round(emi),
                principal: Math.round(principalPart),
                interest: Math.round(interestPart),
                balance: Math.max(0, Math.round(balance))
            });
        }

        setResult({
            emi: Math.round(emi),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest),
            schedule
        });
    };

    const handleReset = () => {
        setAmount("");
        setRate("");
        setTenure("");
        setResult(null);
    };

    return (
        <div className="emi-container">
            <h1>EMI Calculator</h1>
            <p className="emi-subtitle">Calculate your monthly installments with interest</p>

            <div className="emi-layout">

                {/* INPUT CARD */}
                <div className="emi-card">
                    <div className="emi-input-group">
                        <label>Loan Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 500000"
                        />
                    </div>

                    <div className="emi-input-group">
                        <label>Interest Rate (% per annum)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            placeholder="e.g. 12"
                        />
                    </div>

                    <div className="emi-input-group">
                        <label>Tenure (Months)</label>
                        <input
                            type="number"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            placeholder="e.g. 24"
                        />
                    </div>

                    <div className="emi-buttons">
                        <button className="emi-calc-btn" onClick={calculateEMI}>
                            Calculate EMI
                        </button>
                        <button className="emi-reset-btn" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>

                {/* RESULT CARD */}
                {result && (
                    <div className="emi-result-card">
                        <div className="emi-result-hero">
                            <p className="emi-result-label">Monthly EMI</p>
                            <h2 className="emi-result-amount">₹{result.emi.toLocaleString()}</h2>
                        </div>

                        <div className="emi-result-stats">
                            <div className="emi-stat">
                                <span className="emi-stat-label">Principal</span>
                                <span className="emi-stat-value">₹{Number(amount).toLocaleString()}</span>
                            </div>
                            <div className="emi-stat">
                                <span className="emi-stat-label">Total Interest</span>
                                <span className="emi-stat-value emi-interest">₹{result.totalInterest.toLocaleString()}</span>
                            </div>
                            <div className="emi-stat">
                                <span className="emi-stat-label">Total Payment</span>
                                <span className="emi-stat-value">₹{result.totalPayment.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Visual split bar */}
                        <div className="emi-split-bar">
                            <div
                                className="emi-split-principal"
                                style={{ width: `${(Number(amount) / result.totalPayment) * 100}%` }}
                            />
                        </div>
                        <div className="emi-split-legend">
                            <span><span className="dot principal" /> Principal</span>
                            <span><span className="dot interest" /> Interest</span>
                        </div>
                    </div>
                )}
            </div>

            {/* SCHEDULE TABLE */}
            {result && (
                <div className="emi-schedule">
                    <h3>Monthly Breakdown</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>EMI</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.schedule.map((row) => (
                                <tr key={row.month}>
                                    <td>{row.month}</td>
                                    <td>₹{row.emi.toLocaleString()}</td>
                                    <td>₹{row.principal.toLocaleString()}</td>
                                    <td>₹{row.interest.toLocaleString()}</td>
                                    <td>₹{row.balance.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EMICalculator;
