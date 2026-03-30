import "./dashboard.css";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard-container">

            <div className="sidebar">
                <h2>Dashboard</h2>

                <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
                    Home
                </NavLink>

                <NavLink to="/dashboard/apply-loan" className={({ isActive }) => isActive ? "active" : ""}>
                    Apply Loan
                </NavLink>

                <NavLink to="/dashboard/repayment" className={({ isActive }) => isActive ? "active" : ""}>
                    Repayment
                </NavLink>

                <NavLink to="/dashboard/transactions" className={({ isActive }) => isActive ? "active" : ""}>
                    Transactions
                </NavLink>

                <NavLink to="/dashboard/support" className={({ isActive }) => isActive ? "active" : ""}>
                    Support
                </NavLink>
            </div>

            <div className="main">
                <Outlet />
            </div>

        </div>
    );
}

export default Dashboard;