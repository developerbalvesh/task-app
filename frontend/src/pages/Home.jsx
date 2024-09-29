import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth]);
  return (
    <div>
      <Layout>
        <h1>Hello there</h1>
        <h2>Welcome, to TaskApp</h2>
        <h3>Please</h3>
        <div>
          <Link to="/login">
            <button className="btn btn-primary m-1">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary m-1">Signup</button>
          </Link>
        </div>
        <p>to continue</p>
      </Layout>
    </div>
  );
};

export default Home;
