import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Layout>
        <>
        <h1>Hello there</h1>
        <h2>Please</h2>
        <div>
          <Link to='/login'><button className="btn btn-primary m-1">Login</button></Link>
          <Link to='/signup'><button className="btn btn-primary m-1">Signup</button></Link>
        </div>
        <p>to save on cloud</p>
        </>
      </Layout>
    </div>
  );
};

export default Home;
