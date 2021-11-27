import React, { useState, useEffect } from "react";
import { auth } from "../components/firebase/Firebase";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllJobs } from "../functions/jobs";

const Dashboard = () => {
  // Hooks
  let navigate = useNavigate();

  // Redux
  let dispatch = useDispatch();

  // state
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    return getAllJobs().then((res) => {
      setJobs([res.data]);
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOG_OUT",
          payload: null,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.maessage);
      });
  };

  return (
    <div>
      <h1>Signed In</h1>
      <button className='logout-button' onClick={logout}>
        Logout
      </button>
      {/* {console.log(jobs)} */}
      {jobs.map((job) => (
        <div key={job._id}>
          <h1>{job.title}</h1>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
