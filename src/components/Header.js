import React from "react";
import { auth } from "../components/firebase/Firebase";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  // Hooks
  let navigate = useNavigate();

  // Redux
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

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
        toast.error(error.message);
      });
  };

  return (
    <StyledHeader>
      <div className='logo-container'>
        <img src='/logo.png' alt='logo' />
        <p className='company'>Kingsland Jobs</p>
      </div>
      {user && user.role === "subscriber" && (
        <>
          <div className='nav-container'>
            <NavLink className='nav-link' to='/dashboard'>
              Dashboard
            </NavLink>
            <NavLink className='nav-link' to='/jobs'>
              View Jobs
            </NavLink>
            <NavLink className='nav-link' to='/create-job'>
              Create Job
            </NavLink>
            <p className='nav-link'>
              <FaUserCircle className='icon' />
              {user.name}
            </p>
            <p className='logout nav-link' onClick={logout}>
              <FaSignOutAlt />
            </p>
          </div>
        </>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100vw;
  background-color: var(--primary);
  display: flex;
  justify-content: space-between;
  padding: 25px 20px;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  .logo-container {
    display: flex;
    align-items: center;
  }
  .nav-container {
    display: flex;
    align-items: center;
    font-size: 1rem;
    .nav-link {
      color: var(--white);
      text-decoration: none;
      margin-left: 2rem;
      display: flex;
      align-items: center;
    }
    .icon {
      margin-right: 0.5rem;
    }
    .logout {
      cursor: pointer;
    }
  }
  img {
    width: 7%;
    margin-right: 1rem;
  }
  .company {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    color: var(--white);
  }
`;

export default Header;
