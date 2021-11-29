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

// Routes
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import JobDetail from "./pages/JobDetail";
import Post from "./pages/Post";

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
			<div className="container">
				<div className="main-content">
					<ToastContainer />
					<Routes>
						<Route exact element={<Register />} path="/register" />
						<Route
							exact
							element={<RegisterComplete />}
							path="/register/complete"
						/>
						<Route
							exact
							element={<ForgotPassword />}
							path="/forgot/password"
						/>
						<Route exact element={<Login />} path="/" />

						<Route exact path="/" element={<UserRoute />}>
							<Route
								exact
								path="/dashboard"
								element={<Dashboard />}
							/>
						</Route>
						<Route
							exact
							element={<JobDetail />}
							path="/jobdetail"
						/>
						<Route exact element={<Post />} path="/post" />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
			</div>
		</React.StrictMode>
	);
};

export default App;
