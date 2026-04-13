import { useContext } from "react";
import { LoanContext } from "../context/LoanContext";

function DashboardHome() {

    const { loans, transactions } = useContext(LoanContext);

    const totalLoan = loans.reduce(
        (sum, loan) => sum + Number(loan.amount || 0),
        0
    );

    const totalPaid = loans.reduce(
        (sum, loan) => sum + Number(loan.paid || 0),
        0
    );

    const activeLoans = loans.filter(l => (l.paid || 0) < l.amount);
    const paidPercent = totalLoan > 0 ? Math.round((totalPaid / totalLoan) * 100) : 0;

    // SVG circle params
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeOffset = circumference - (paidPercent / 100) * circumference;

    return (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>

            {/* ── HEADER ── */}
            <div style={{ marginBottom: "32px" }}>
                <h1 style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.3px",
                    marginBottom: "4px"
                }}>
                    Your Spending
                </h1>
                <p style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    fontWeight: "500"
                }}>
                    Loan overview at a glance
                </p>
            </div>

            {/* ── TOP ROW: Circle + Quick Stats ── */}
            <div style={{
                display: "flex",
                gap: "20px",
                marginBottom: "28px",
                flexWrap: "wrap"
            }}>

                {/* CIRCULAR PROGRESS */}
                <div style={{
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-color)",
                    padding: "28px 36px",
                    display: "flex",
                    alignItems: "center",
                    gap: "28px",
                    flex: "1",
                    minWidth: "300px"
                }}>
                    <div style={{ position: "relative", width: "140px", height: "140px", flexShrink: 0 }}>
                        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                            {/* Background ring */}
                            <circle
                                cx="70" cy="70" r={radius}
                                fill="none"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="10"
                            />
                            {/* Progress ring */}
                            <circle
                                cx="70" cy="70" r={radius}
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeOffset}
                                style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#1E90FF" />
                                    <stop offset="100%" stopColor="#00D2FF" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Center text */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{
                                fontSize: "28px",
                                fontWeight: "800",
                                color: "var(--text-primary)",
                                letterSpacing: "-0.5px"
                            }}>
                                {paidPercent}%
                            </span>
                            <span style={{
                                fontSize: "11px",
                                color: "var(--text-muted)",
                                fontWeight: "500",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase"
                            }}>
                                Repaid
                            </span>
                        </div>
                    </div>

                    {/* Stats next to circle */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                            <p style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>
                                Total Borrowed
                            </p>
                            <p style={{ color: "var(--text-primary)", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.3px" }}>
                                ₹{totalLoan.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>
                                Remaining
                            </p>
                            <p style={{ color: "var(--accent-orange)", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.3px" }}>
                                ₹{(totalLoan - totalPaid).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* QUICK STAT CARDS */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    minWidth: "180px"
                }}>
                    <div className="card" style={{ flex: 1 }}>
                        <p>Active Loans</p>
                        <h2>{activeLoans.length}</h2>
                    </div>
                    <div className="card" style={{ flex: 1 }}>
                        <p>Total Paid</p>
                        <h2 style={{ color: "var(--accent-green)" }}>₹{totalPaid.toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            {/* ── RECENT TRANSACTIONS ── */}
            <div>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "14px",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.2px"
                }}>
                    Recent Activity
                </h3>

                {transactions.length === 0 ? (
                    <div style={{
                        background: "var(--bg-card)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--border-color)",
                        padding: "40px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontSize: "13px"
                    }}>
                        No transactions yet — apply for a loan to get started
                    </div>
                ) : (
                    <div style={{
                        background: "var(--bg-card)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--border-color)",
                        overflow: "hidden"
                    }}>
                        {transactions.slice(-5).reverse().map((tx, idx, arr) => (
                            <div key={tx.id} style={{
                                padding: "14px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: idx < arr.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                                transition: "background 0.15s ease",
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    {/* Icon circle */}
                                    <div style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "10px",
                                        background: tx.category === "Loan"
                                            ? "var(--accent-green-subtle)"
                                            : "var(--accent-orange-subtle)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "14px",
                                        flexShrink: 0
                                    }}>
                                        {tx.category === "Loan" ? "↓" : "↑"}
                                    </div>
                                    <div>
                                        <p style={{
                                            color: "var(--text-primary)",
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            marginBottom: "2px"
                                        }}>
                                            {tx.type} — {tx.category}
                                        </p>
                                        <p style={{
                                            color: "var(--text-muted)",
                                            fontSize: "11px",
                                            fontWeight: "500"
                                        }}>
                                            {tx.date}
                                        </p>
                                    </div>
                                </div>
                                <span style={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: tx.category === "Loan"
                                        ? "var(--accent-green)"
                                        : "var(--accent-orange)",
                                    letterSpacing: "-0.3px"
                                }}>
                                    {tx.category === "Loan" ? "+" : "−"}₹{tx.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardHome;