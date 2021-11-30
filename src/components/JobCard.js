import React, { useState, useEffect } from "react";
import { getAllJobs } from "../functions/jobs";

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
		flexBasis: "32%",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 16,
		marginBotton: 16,
	},
	pos: {
		fontSize: 14,
	},
});

const Dashboard = () => {
	const classes = useStyles();

	// state
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		return getAllJobs().then((res) => {
			console.log(res);
			setJobs(res.data);
		});
	}, []);

	return (
		<div>
			<div className={classes.container}>
				{jobs &&
					jobs.map((job) => (
						<Card
							key={job._id}
							className={classes.root}
							variant="outlined"
						>
							<CardContent>
								<Typography variant="h5" component="h2">
									{job.title}
								</Typography>
								<Typography
									className={classes.title}
									color="textSecondary"
								>
									{job.company}
								</Typography>

								<Typography
									className={classes.pos}
									color="textSecondary"
									gutterBottom
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
								<Button
									size="small"
									variant="contained"
									color="secondary"
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					))}
			</div>
		</div>
	);
};

export default Dashboard;
