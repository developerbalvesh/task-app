import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true)
    try {
      setAuth({
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast("Logged out!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  return (
    <>
      <Layout>
        <h1>Hello {auth?.user?.name}</h1>
        <h2>Welcome to TaskApp</h2>
        <button disabled={loading} className="btn btn-danger mb-5" onClick={() => handleLogout()}>
          {loading && (
            <div className="spinner"></div>
          )}
          {!loading && 'Logout'}
        </button>
      </Layout>
    </>
  );
};

export default Dashboard;
