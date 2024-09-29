import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    setDisable(true);
    e.preventDefault();
    if (!phone) {
      toast.error("Valid Phone number is required");
      setDisable(false)
    } else if (!password) {
      toast.error("Password is required");
      setDisable(false)
    } else {
      try {
        const { data } = await axios.post("/api/v1/auth/login", {
          phone,
          password,
        });
        if (data?.success) {
          setAuth({
            ...auth,
            user: data.user,
            token: data.token,
          });
          toast.success(data?.message);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setDisable(false);
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        setDisable(false);
        toast.error('Something went wrong!');
      }
    }
  };
  return (
    <div>
      <Layout>
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={(e) => handleLogin(e)}
        >
          <h1>Login here</h1>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Phone no"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="password w-100 m-2 ">
            <input
              type={show ? `text` : `password`}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={!show ? `fa-solid fa-eye-slash` : `fa-solid fa-eye`}
              onClick={() => {
                setShow(!show);
              }}
            ></i>
          </div>
          <div>
            <button
              className="btn text-center btn-primary m-1 w-100"
              disabled={disable}
            >
              {disable ? <div className="spinner"></div> : "Login"}
            </button>
          </div>
          <h2 className="mt-3">
            Forgot password?{" "}
            <Link to="/forgot">
              <button className="btn btn-primary">Forgot</button>
            </Link>
          </h2>
        </form>
      </Layout>
    </div>
  );
};

export default LoginPage;
