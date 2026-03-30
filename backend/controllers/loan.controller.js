import Loan from "../models/loan.js";

// CREATE LOAN
export const createLoan = async (req, res) => {
    try {
        const { type, amount } = req.body;

        const loan = await Loan.create({
            type,
            amount,
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
        const loans = await Loan.find();

        res.status(200).json(loans);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};