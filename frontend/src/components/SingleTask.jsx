import React, { useState } from "react";

const SingleTask = ({ title, isDone, description, id, handleDone }) => {

  const [done, setDone]=useState(false);

  return (
    <>
      <div className={`col-lg-6`}>
        <div className={done?`card text-bg-light mb-3 animate__animated animate__hinge`:`card text-bg-light mb-3`}>
          <div className="card-header">
            <h5 className="card-title">{title}</h5>
          </div>
          <div className="card-body text-center">
            <p className="card-text overflow-auto text-start">{description}</p>
            <button
              className="w-50 btn btn-secondary"
              onClick={() => {
                handleDone(id);
                // setDone(true)
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
