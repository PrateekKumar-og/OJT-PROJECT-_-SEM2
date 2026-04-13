import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    duration: {
        type: Number,
        default: 12,
        min: 1
    },
    purpose: {
        type: String,
        default: ""
    },
    paid: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active"
    }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);