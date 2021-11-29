import React, { useState, useEffect } from "react";
// import { auth } from "../components/firebase/Firebase";
// import { signOut } from "@firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import { getAllJobs } from "../functions/jobs";

const JobDetail = () => {
	// Hooks
	// let navigate = useNavigate();

	// Redux
	// let dispatch = useDispatch();

	// state
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		return getAllJobs().then((res) => {
			setJobs([res.data]);
		});
	}, []);

	// const logout = () => {
	// 	signOut(auth)
	// 		.then(() => {
	// 			dispatch({
	// 				type: "LOG_OUT",
	// 				payload: null,
	// 			});
	// 			navigate("/");
	// 		})
	// 		.catch((error) => {
	// 			toast.error(error.message);
	// 		});
	// };

	return (
		<div>
			{jobs.map((job) => (
				<div key={job._id}>
					<h1>{job.title}</h1>
					<p>{job.company}</p>
					<p>{job.location}</p>
					<br />
					<hr />
					<br />
					<p>
						<b>Salary</b>
						<br />
						{job.salary}
					</p>
					<br />
					<hr />
					<br />
					<p>
						<b>Job Description</b>
						<br />
						{job.description}
					</p>
					<br />
					<hr />
					<br />
					<p>
						<b>Please email {job.contactEmail} to apply</b>
					</p>
				</div>
			))}
		</div>
	);
};

export default JobDetail;
