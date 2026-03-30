import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ROUTES
import loanRoutes from "./routes/loan.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROOT CHECK
app.get("/", (req, res) => {
    res.send("API running...");
});

// DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/recopay")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ROUTES
app.use("/api/loans", loanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});