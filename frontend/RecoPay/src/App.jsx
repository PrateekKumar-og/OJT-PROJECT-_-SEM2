import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import DashboardHome from "./pages/dashboardHome";
import ApplyLoan from "./pages/applyloan";
import Repayment from "./pages/repayment";
import Transactions from "./pages/transactions";
import Support from "./pages/support";
import EMICalculator from "./pages/emicalculator";
import Profile from "./pages/profile";
import Login from "./pages/login";

// 🔒 PROTECTED ROUTE
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // Kill Google One Tap popup
  useEffect(() => {
    const removeGoogleOneTap = () => {
      const el = document.getElementById("credential_picker_container");
      if (el) el.remove();
      document.querySelectorAll('iframe[src*="accounts.google.com/gsi"]').forEach(f => f.remove());
    };
    removeGoogleOneTap();
    const observer = new MutationObserver(removeGoogleOneTap);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* REDIRECT / to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* DASHBOARD (PROTECTED) */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="apply-loan" element={<ApplyLoan />} />
        <Route path="repayment" element={<Repayment />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="support" element={<Support />} />
        <Route path="emi-calculator" element={<EMICalculator />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "var(--bg-base)",
          color: "var(--text-primary)",
          fontFamily: "Inter, sans-serif"
        }}>
          <h1 style={{ fontSize: "72px", fontWeight: "800", marginBottom: "8px", color: "var(--primary)" }}>404</h1>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "24px" }}>Page not found</p>
          <a href="/dashboard" style={{
            padding: "10px 24px",
            background: "var(--primary)",
            color: "white",
            borderRadius: "100px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px"
          }}>Go Home</a>
        </div>
      } />
    </Routes>
  );
}

export default App;