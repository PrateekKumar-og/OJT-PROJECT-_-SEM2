import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);