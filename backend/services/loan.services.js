import Loan from "../models/loan.js";

export const createLoanService = async (data) => {
    const loan = new Loan(data);
    return await loan.save();
};

export const getAllLoansService = async () => {
    return await Loan.find().sort({ createdAt: -1 });
};