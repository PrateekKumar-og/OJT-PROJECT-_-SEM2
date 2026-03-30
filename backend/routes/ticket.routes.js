import express from "express";
import {
    createTicket,
    getTickets,
    resolveTicket
} from "../controllers/ticket.controller.js";

const router = express.Router();

// CREATE
router.post("/", createTicket);

// GET ALL
router.get("/", getTickets);

// RESOLVE
router.put("/:id", resolveTicket);

export default router;