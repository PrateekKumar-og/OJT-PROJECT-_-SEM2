import Loan from "../models/loan.js";

// CREATE LOAN
export const createLoan = async (req, res) => {
    try {
        const { type, amount, duration, purpose } = req.body;

        // ✅ INPUT VALIDATION
        if (!type || !amount) {
            return res.status(400).json({ message: "Type and amount are required" });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const loan = await Loan.create({
            type,
            amount: Number(amount),
            duration: Number(duration) || 12,
            purpose: purpose || "",
            paid: 0
        });

        res.status(201).json({
            message: "Loan created",
            loan
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL LOANS
export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().sort({ createdAt: -1 });

        res.status(200).json(loans);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};