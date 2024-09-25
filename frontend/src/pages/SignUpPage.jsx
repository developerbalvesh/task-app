import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div>
      <Layout>
        <h1>Signup here</h1>
        <input
          type="text"
          className="form-control w-50 m-2"
          placeholder="Name"
        />
        <input
          type="text"
          className="form-control w-50 m-2"
          placeholder="Phone no"
        />
        <input
          type="password"
          className="form-control w-50  m-2"
          placeholder="Password"
        />
        <div>
          <button className="btn btn-primary m-1">Sign up</button>
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

export default SignUpPage;
