import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import styled from "styled-components";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(0),
		},
		width: "100%",
	},
	formControl: {
		width: "100%",
		marginBottom: "1rem",
	},
}));

const RegisterComplete = () => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//const { user } = useSelector((state) => ({ ...state }));
	let dispatch = useDispatch();
	let navigate = useNavigate();

	useEffect(() => {
		setEmail(window.localStorage.getItem("emailForRegistration"));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// validation
		if (!email || !password) {
			toast.error("Email and Password are required.");
			return;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long.");
			return;
		}
		try {
			const result = await signInWithEmailLink(
				auth,
				email,
				window.location.href
			);
			// console.log(result);
			if (result.user.emailVerified) {
				// remove user email form local storage
				window.localStorage.removeItem("emailForRegistration");

				// get user ID token
				let user = auth.currentUser;
				await updatePassword(user, password);
				//await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();

				// redux store
				createOrUpdateUser(idTokenResult.token)
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

				// redirect
				navigate("/");
			}
		} catch (error) {
			toast.error(error.maessage);
		}
	};

	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<FormControl className={classes.formControl}>
				<TextField
					type="email"
					className="form-control"
					value={email}
					variant="outlined"
					onChange={(e) => setEmail(e.target.value)}
					// disabled
					autoFocus
					placeholder="Email"
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					type="password"
					className="form-control"
					value={password}
					variant="outlined"
					onChange={(e) => setPassword(e.target.value)}
					autoFocus
					placeholder="Password"
				/>
			</FormControl>
			<br />
			<Button type="submit" variant="contained" color="primary">
				Complete Registration
			</Button>
		</form>
	);

	return (
		<StyledRegisterComplete>
			<h4>Complete Registration</h4>
			{completeRegistrationForm()}
		</StyledRegisterComplete>
	);
};

const StyledRegisterComplete = styled.div`
	height: 50vh;
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default RegisterComplete;
