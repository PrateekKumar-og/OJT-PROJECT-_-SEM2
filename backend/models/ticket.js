import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: String,
    email: String,
    issue: String,
    status: {
        type: String,
        default: "Open"
    }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);