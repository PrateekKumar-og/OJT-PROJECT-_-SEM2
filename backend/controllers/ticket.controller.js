import Ticket from "../models/ticket.js";

// CREATE TICKET
export const createTicket = async (req, res) => {
    try {
        const { name, email, issue } = req.body;

        const ticket = await Ticket.create({
            name,
            email,
            issue
        });

        res.status(201).json({
            message: "Ticket created",
            ticket
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL TICKETS
export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.status(200).json(tickets);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// RESOLVE TICKET
export const resolveTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { status: "Resolved" },
            { new: true }
        );

        res.status(200).json({
            message: "Ticket resolved",
            ticket
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};