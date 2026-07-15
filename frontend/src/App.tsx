import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoanApplicationPage from "./pages/LoanApplicationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply"
        element={
          <ProtectedRoute>
            <LoanApplicationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;