import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            "secret123",
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            "secret123",
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ME (PROTECTED)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};