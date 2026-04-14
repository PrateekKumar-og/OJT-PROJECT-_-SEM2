import express from "express";
import { createLoan, getLoans, updateLoan, deleteLoan } from "../controllers/loan.controller.js";

const router = express.Router();

// CREATE LOAN
router.post("/", createLoan);

// GET ALL LOANS
router.get("/", getLoans);

// PAY EMI (update paid amount)
router.put("/:id/pay", updateLoan);

// DELETE LOAN
router.delete("/:id", deleteLoan);

export default router;