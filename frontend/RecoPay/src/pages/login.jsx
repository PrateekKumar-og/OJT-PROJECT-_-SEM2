import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "./login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });

            if (res.token) {
                localStorage.setItem("token", res.token);
                navigate("/dashboard");
            } else {
                alert(res.message || "Login failed");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="login-container">

            {/* LEFT */}
            <div className="login-left">
                <h1>RecoPay</h1>
                <p>
                    Manage loans, track <span>payments</span>, and grow financially with ease.
                </p>
            </div>

            {/* RIGHT */}
            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>

                    <form onSubmit={handleLogin}>

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
                            Log In
                        </button>

                    </form>

                    <p className="signup-text">
                        Don’t have an account?{" "}
                        <span onClick={() => navigate("/signup")}>
                            Create account
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;