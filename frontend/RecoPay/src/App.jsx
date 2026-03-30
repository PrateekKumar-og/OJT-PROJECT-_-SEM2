import { Routes, Route } from "react-router-dom";

// PAGES
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import DashboardHome from "./pages/dashboardHome";
import ApplyLoan from "./pages/applyloan";
import Repayment from "./pages/repayment";
import Transactions from "./pages/transactions";
import Support from "./pages/support";

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />}>

        {/* DEFAULT */}
        <Route index element={<DashboardHome />} />

        {/* CHILD */}
        <Route path="apply-loan" element={<ApplyLoan />} />
        <Route path="repayment" element={<Repayment />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="support" element={<Support />} />

      </Route>

    </Routes>
  );
}

export default App;