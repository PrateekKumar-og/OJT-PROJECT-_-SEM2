import Loan from "../models/loan.js";

// CREATE LOAN
export const createLoan = async (req, res) => {
    try {
        const { type, amount, duration, purpose, userEmail } = req.body;

        if (!type || !amount || !userEmail) {
            return res.status(400).json({ message: "Type, amount, and userEmail are required" });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const loan = await Loan.create({
            userEmail,
            type,
            amount: Number(amount),
            duration: Number(duration) || 12,
            purpose: purpose || "",
            paid: 0,
            status: "Active"
        });

        res.status(201).json(loan);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET LOANS (filtered by userEmail)
export const getLoans = async (req, res) => {
    try {
        const { email } = req.query;
        const filter = email ? { userEmail: email } : {};
        const loans = await Loan.find(filter).sort({ createdAt: -1 });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE LOAN (pay EMI)
export const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        const emi = Math.ceil(loan.amount / (loan.duration || 12));
        let newPaid = (loan.paid || 0) + emi;

        if (newPaid >= loan.amount) {
            newPaid = loan.amount;
        }

        loan.paid = newPaid;
        loan.status = newPaid >= loan.amount ? "Completed" : "Active";
        await loan.save();

        res.status(200).json(loan);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE LOAN
export const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findByIdAndDelete(id);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({ message: "Loan deleted", loan });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};