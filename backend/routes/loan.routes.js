import express from "express";
import { createLoan, getLoans } from "../controllers/loan.controller.js";

const router = express.Router();

// CREATE LOAN
router.post("/", createLoan);

// GET ALL LOANS
router.get("/", getLoans);

export default router;