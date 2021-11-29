import React, { useState, useEffect } from "react";
import { auth } from "../components/firebase/Firebase";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllJobs } from "../functions/jobs";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	container: {
		display: "flex",
		justifyContent: "space-around",
	},
	root: {
		flexBasis: "31%",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const Dashboard = () => {
	const classes = useStyles();

	// Hooks
	let navigate = useNavigate();

	// Redux
	let dispatch = useDispatch();

	// state
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		return getAllJobs().then((res) => {
			console.log(res);
			setJobs(res.data);
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
				toast.error(error.message);
			});
	};

	return (
		<div>
			<h1>Signed In</h1>
			<button className="logout-button" onClick={logout}>
				Logout
			</button>

			<Link to="/post">Post Job</Link>

			<div className={classes.container}>
				{jobs &&
					jobs.map((job) => (
						<Card
							key={job._id}
							className={classes.root}
							variant="outlined"
						>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									{job.title}
								</Typography>
								<Typography variant="h5" component="h2">
									{job.company}
								</Typography>
								<Typography
									className={classes.pos}
									color="textSecondary"
								>
									{job.location}
								</Typography>
								<Typography variant="body2" component="p">
									$
									{new Intl.NumberFormat("en-IN", {
										maximumSignificantDigits: 3,
									}).format(job.salary)}
									/year
								</Typography>
								<Typography variant="body2" component="p">
									{job.description.substring(0, 20)}...
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									size="small"
									variant="contained"
									color="primary"
								>
									Edit
								</Button>
							</CardActions>
						</Card>
					))}
			</div>
		</div>
	);
};

export default Dashboard;
