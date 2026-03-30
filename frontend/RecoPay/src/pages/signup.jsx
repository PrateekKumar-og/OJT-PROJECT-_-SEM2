import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";
import "./login.css"; // ✅ reuse same styling

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await signupUser({ name, email, password });

            if (res.token) {
                // ✅ save token
                localStorage.setItem("token", res.token);

                // ✅ redirect to dashboard
                navigate("/dashboard");
            } else {
                alert(res.message || "Signup failed");
            }

        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="login-container">

            {/* LEFT SIDE */}
            <div className="login-left">
                <h1>RecoPay</h1>
                <p>
                    Start your journey with <span>smart finance</span> today.
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="login-right">

                <div className="login-card">

                    <h2>Create Account</h2>

                    <form onSubmit={handleSignup}>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">
                            Sign Up
                        </button>

                    </form>

                    <p className="signup-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/")}>
                            Login
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;