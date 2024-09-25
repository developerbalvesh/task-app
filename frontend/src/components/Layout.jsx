import React, { useState } from "react";
import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";

const Layout = ({children}) => {
    const [nav, setNav]=useState(false)
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-5 mobile-nav">
                <div className="text-end p-2">
                <i onClick={()=>setNav(!nav)} class={!nav?"fa-solid fa-bars fs-2":"fa-solid fa-xmark fs-1"}></i>
                </div>
            </div>
          <div className={!nav?"col-md-5 mobile-menu":"col-md-5"}>
            <div className="pages d-flex flex-column justify-content-center align-items-center">
              {children}
              <div className="line"></div>
              <div className="text-center d-flex flex-column justify-content-center align-items-center p-5 gap-2">
                <h3 className="text-secondary text-start w-100 text-big">Add Task</h3>
                <input
                  type="text"
                  className="formcontrol fs-6 p-2"
                  placeholder="Title"
                />
                <input
                  type="text"
                  className="formcontrol fs-6 p-2"
                  placeholder="Description"
                />
                <button className="btn btn-success fs-5 w-100">Add</button>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="task-list border">
              <div className="container-fluid">
                <div className="row p-3">
                  <SingleTask />
                  <SingleTask />
                  <SingleTask />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home">
        <Link to='/'><i class="fa-solid fa-house"></i></Link>
      </div>
    </>
  );
};

export default Layout;
