import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [gOpt, setGOtp] = useState(true);
  const [vOtp, setVOtp] = useState(false);
  const [resetP, setResetP] = useState(false);
  const [phone, setPhone]=useState('');
  const [otp, setOtp]=useState('');
  const [vOtpInput, setVOtoInput] = useState('');
  const [nPass, setNPass] = useState('');
  const [disabled, setDisabled]=useState(false);
  const navigate=useNavigate();


  const handlGetOtp = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`/api/v1/auth/get-otp`,{
        phone
      })

      if(data.success){
        setOtp(data.otp);
        setVOtp(true);
        setGOtp(false);
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const verifyOtp=async()=>{
    try {
      const {data} = await axios.post('/api/v1/auth/verify-otp',{
        otp, vOtpInput
      });

      if(data.success){
        toast.success(data.message);
        setResetP(true);
        setVOtp(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  // new password
  const handleNewPass=async()=>{
    try {
      setDisabled(true);
      const {data} = await axios.post('/api/v1/auth/new-pass',{
        phone, nPass
      })
      if(data.success){
        toast.success("Password reset successfully");
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }else{
        setDisabled(false)
      }
    } catch (error) {
      setDisabled(false)
    }
  }
  return (
    <div>
      <Layout>
        <h1>Forgot Password</h1>
        <input
          type="text"
          className={`form-control w-50 m-2`}
          placeholder="Phone no"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />
        <input
          type="text"
          className={`form-control w-50  m-2 ${!vOtp ? "d-none" : " "}`}
          placeholder="OTP"
          value={vOtpInput}
          onChange={e=>setVOtoInput(e.target.value)}
        />
        <input
          type="password"
          className={`form-control w-50  m-2 ${!resetP ? "d-none" : " "}`}
          placeholder="New Password"
          value={nPass}
          onChange={e=>setNPass(e.target.value)}
        />
        <div>
          <button
            className={`btn btn-primary m-1 ${!gOpt ? `d-none` : ` `}`}
            onClick={(e) => handlGetOtp(e)}
          >
            Get OTP
          </button>
          <button
            className={`btn btn-primary m-1 ${!vOtp ? `d-none` : ` `}`}
            onClick={(e) => {
              verifyOtp(e);
            }}
          >
            Verify OTP
          </button>
          <button disabled={disabled} className={`btn btn-primary m-1 ${!resetP ? `d-none` : ` `}`} onClick={()=>handleNewPass()}>
            Reset
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default ForgotPasswordPage;
