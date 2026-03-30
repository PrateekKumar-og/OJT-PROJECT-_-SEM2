import { useContext } from "react";
import { LoanContext } from "../context/LoanContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./transactions.css";

function Transactions() {

    const context = useContext(LoanContext);
    if (!context) return <h2>Loading...</h2>;

    const { transactions = [] } = context;

    // 🔥 FINAL PDF FUNCTION (BUG FREE)
    const downloadPDF = () => {

        const doc = new jsPDF();

        // 🏦 LOGO
        doc.setFontSize(20);
        doc.setTextColor(40, 100, 200);
        doc.text("RecoPay", 14, 18);

        // 📄 TITLE
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Loan Transaction Statement", 14, 28);

        // 👤 USER + DATE
        doc.setFontSize(10);
        doc.text("User: Demo User", 14, 36);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 36);

        // 💰 CALCULATIONS
        const totalCredit = transactions
            .filter(tx => tx.category === "Loan")
            .reduce((sum, tx) => sum + Number(tx.amount), 0);

        const totalDebit = transactions
            .filter(tx => tx.category === "Repayment")
            .reduce((sum, tx) => sum + Number(tx.amount), 0);

        const balance = totalCredit - totalDebit;

        // 💰 SUMMARY (FIXED)
        doc.setFontSize(11);
        doc.text(`Total Credit: Rs. ${totalCredit}`, 14, 46);
        doc.text(`Total Debit: Rs. ${totalDebit}`, 80, 46);
        doc.text(`Balance: Rs. ${balance}`, 150, 46);

        // 📊 TABLE DATA (FIXED SPACING BUG)
        const tableData = transactions.map((tx) => [
            tx.date,
            tx.id,
            tx.type,
            tx.category,
            "Rs. " + String(tx.amount), // ✅ NO MORE SPACING BUG
            tx.status
        ]);

        // 📊 TABLE
        autoTable(doc, {
            head: [["Date", "ID", "Type", "Category", "Amount", "Status"]],
            body: tableData,
            startY: 55,

            styles: {
                fontSize: 10,
                cellPadding: 4,
            },

            headStyles: {
                fillColor: [40, 100, 200],
                textColor: 255,
                fontStyle: "bold"
            },

            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },

            columnStyles: {
                4: { halign: "right" },
            }
        });

        // 📌 FOOTER
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(
            "This is a system-generated statement. No signature required.",
            14,
            doc.lastAutoTable.finalY + 10
        );

        doc.save("RecoPay_Statement.pdf");
    };

    return (
        <div className="transactions-container">

            <h1>Transaction History</h1>

            {/* ✅ BUTTON */}
            <button className="download-btn" onClick={downloadPDF}>
                Download Statement
            </button>

            {transactions.length === 0 ? (
                <p>No transactions yet</p>
            ) : (
                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id}>
                                <td>{tx.date}</td>
                                <td>{tx.id}</td>
                                <td>{tx.type}</td>
                                <td>{tx.category}</td>
                                <td>₹{tx.amount}</td>

                                {/* ✅ STATUS COLOR FIX */}
                                <td
                                    style={{
                                        color:
                                            tx.status === "Failed"
                                                ? "#dc2626"
                                                : "#16a34a",
                                        fontWeight: "600"
                                    }}
                                >
                                    {tx.status}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            )}

        </div>
    );
}

export default Transactions;