import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [gOpt, setGOtp] = useState(true);
  const [vOtp, setVOtp] = useState(false);
  const [resetP, setResetP] = useState(false);
  return (
    <div>
      <Layout>
        <h1>Forgot Password</h1>
        <input
          type="text"
          className={`form-control w-50 m-2`}
          placeholder="Phone no"
        />
        <input
          type="text"
          className={`form-control w-50  m-2 ${!vOtp ? "d-none" : " "}`}
          placeholder="OTP"
        />
        <input
          type="text"
          className={`form-control w-50  m-2 ${!resetP ? "d-none" : " "}`}
          placeholder="New Password"
        />
        <div>
          <button className={`btn btn-primary m-1 ${!gOpt ? `d-none` : ` `}`} onClick={()=>{setVOtp(true); setGOtp(false)}}>
            Get OTP
          </button>
          <button className={`btn btn-primary m-1 ${!vOtp ? `d-none` : ` `}`} onClick={()=>{setResetP(true); setVOtp(false);}}>
            Verify OTP
          </button>
          <button className={`btn btn-primary m-1 ${!resetP ? `d-none` : ` `}`}>
            Reset
          </button>
        </div>
        <p className="text-danger p-0 m-0">error!</p>
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

export default ForgotPasswordPage;
