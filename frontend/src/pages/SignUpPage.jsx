import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const handleSignup = async (e) => {
    setDisable(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/signup", {
        name,
        phone,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        setInterval(()=>{
          navigate("/login");
        },3000)
      } else {
        toast.error(data.message);
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      toast.error(error.response.data.message)
      console.log(error);
    }
  };
  return (
    <div>
      <Layout>
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={(e) => handleSignup(e)}
        >
          <h1>Signup here</h1>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            <button className="btn text-center btn-primary m-1 w-100" disabled={disable}>
              {disable?(
                <div className="spinner"></div>
              ):'Signup'}
            </button>
          </div>
        </form>
        <h2 className="mt-3">
          Forgot password?{" "}
          <Link to="/forgot">
            <button className="btn btn-primary">Forgot</button>
          </Link>
        </h2>
      </Layout>
    </div>
  );
};

export default SignUpPage;
