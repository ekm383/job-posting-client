import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./components/firebase/Firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Route Management
import UserRoute from "./components/routes/UserRoute";

// Partials
import Header from "./components/Header";

// Routes
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import JobCreate from "./pages/JobCreate";
import Home from "./pages/Index";
import JobsAll from "./pages/JobsAll";
import JobUpdate from "./pages/JobUpdate";

const App = () => {
  const dispatch = useDispatch();

  // Check Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        // Persist Token in DB
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // Clean Up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <React.StrictMode>
      <div className='container'>
        <Header />
        <div className='main-content'>
          <ToastContainer />
          <Routes>
            <Route exact element={<Register />} path='/register' />
            <Route
              exact
              element={<RegisterComplete />}
              path='/register/complete'
            />
            <Route exact element={<ForgotPassword />} path='/forgot/password' />
            <Route exact element={<Home />} path='/' />
            <Route exact path='/jobs' element={<UserRoute />}>
              <Route exact path='/jobs' element={<JobsAll />} />
            </Route>
            <Route exact path='/dashboard' element={<UserRoute />}>
              <Route exact path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/create-job' element={<UserRoute />}>
              <Route exact path='/create-job' element={<JobCreate />} />
            </Route>
            <Route exact path='/user/job/:slug' element={<UserRoute />}>
              <Route exact path='/user/job/:slug' element={<JobUpdate />} />
            </Route>
            <Route path='*' element={<Error />} />
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default App;
