import React from "react";
import { auth } from "../components/firebase/Firebase";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  // Hooks
  let navigate = useNavigate();

  // Redux
  let dispatch = useDispatch();

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
    </div>
  );
};

export default Dashboard;
