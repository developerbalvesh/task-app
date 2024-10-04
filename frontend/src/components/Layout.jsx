import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Auth";
import axios from "axios";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/task/add-task", {
        token: auth?.token,
        title,
        description,
      });
      if (data.success) {
        toast.success("Added");
        getTasks();
      } else {
        toast.success("Error while adding");
      }
    } catch (error) {
      console.log(error);
    }
    // updateLocalStorage();
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.post("/api/v1/task/tasks", {
        token: auth?.token,
      });
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {}
  };

  const handleDone = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/task/delete-task/${id}`, {
        token: auth?.token,
      });

      if (data.success) {
        setTimeout(() => {
          toast.success("Deleted");
          getTasks();
        }, 0);
      } else {
        toast.error("Error while deleting");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, [tasks]);

  useEffect(() => {
    if (auth?.user) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [auth]);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 mobile-nav">
            <div className="text-end p-2">
              <i
                onClick={() => setNav(!nav)}
                className={
                  !nav ? "fa-solid fa-bars fs-2" : "fa-solid fa-xmark fs-1"
                }
              ></i>
            </div>
          </div>
          <div className={!nav ? "col-md-5 mobile-menu" : "col-md-5"}>
            <div className="pages d-flex flex-column justify-content-center align-items-center">
              {children}
              {auth?.user && (
                <>
                  <div className="line"></div>
                  <form onSubmit={handleSubmit}>
                    <div className="text-center d-flex flex-column justify-content-center align-items-center p-5 gap-2">
                      <h3 className="text-secondary text-start w-100 text-big">
                        Add Task
                      </h3>
                      <input
                        required
                        type="text"
                        className="formcontrol fs-6 p-2"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        required
                        type="text"
                        className="formcontrol fs-6 p-2"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <button className="btn btn-success fs-5 w-100">
                        Add
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="col-md-7">
            <div className="task-list border">
              <div className="container-fluid">
                {tasks.length > 0 && (
                  <>
                    <div className="row p-3">
                      {tasks.map((t) => (
                        <SingleTask
                          title={t.title}
                          description={t.description}
                          id={t._id}
                          isDone={t.done}
                          handleDone={handleDone}
                        />
                      ))}
                    </div>
                  </>
                )}

                {!tasks.length > 0 && (
                  <>
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                      <h1 className="text-secondary">No tasks found</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home">
        <Link to="/">
          <i className="fa-solid fa-house"></i>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
