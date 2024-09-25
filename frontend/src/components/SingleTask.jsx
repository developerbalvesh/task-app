import React from "react";

const SingleTask = () => {
  return (
    <>
      <div className="col-lg-6">
        <div className="card text-bg-light mb-3">
          <div className="card-header">
            <h5 className="card-title">Title Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, doloribus.</h5>
          </div>
          <div className="card-body text-center">
            <p className="card-text overflow-auto text-start">
              Lorem ipsum   
            </p>
            <button className="w-50 btn btn-secondary">Done</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
