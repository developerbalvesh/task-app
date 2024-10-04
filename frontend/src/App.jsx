import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/Auth";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Spinner from "./components/Spinner";

function App() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        {!auth?.user && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        )}
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
