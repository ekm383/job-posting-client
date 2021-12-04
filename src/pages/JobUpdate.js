import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJob, updateJob } from "../functions/jobs";
import JobUpdateForm from "../components/Forms/JobUpdateForm";
import styled from "styled-components";

const initialState = {
	title: "",
	company: "",
	location: "",
	salary: "",
	description: "",
	contactEmail: "",
};

const JobUpdate = () => {
	// state
	const [values, setValues] = useState(initialState);

	const { user } = useSelector((state) => ({ ...state }));
	const params = useParams();
	const navigate = useNavigate();

	const { slug } = params;
	//console.log(slug);

	useEffect(() => {
		getJob(slug, user.token).then((p) => {
			setValues({ ...values, ...p.data });
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		updateJob(slug, values, user.token)
			.then((res) => {
				toast.success(`${res.data.title} is updated.`);
				navigate("/dashboard");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<StyledUpdateForm>
			<JobUpdateForm
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				values={values}
			/>
		</StyledUpdateForm>
	);
};

const StyledUpdateForm = styled.div`
	padding: 0 2rem;
`;

export default JobUpdate;
