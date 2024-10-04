import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100vh", width:'100%'}}>
      <h5>Please wait</h5>
        <div
          className="spinner"
          style={{height: "30px", width: "30px" }}
        ></div>
      </div>
    </>
  );
};

export default Spinner;
