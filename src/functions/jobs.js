import axios from "axios";

export const getAllJobs = async (authToken) => {
	return await axios.get(`${process.env.REACT_APP_API}/jobs`, {
		headers: {
			authToken,
		},
	});
};

export const getUsersJobs = async (authToken) => {
	return await axios.get(`${process.env.REACT_APP_API}/user/jobs`, {
		headers: {
			authToken,
		},
	});
};

export const createJobs = async (jobs, authToken) => {
	return await axios.post(`${process.env.REACT_APP_API}/user/create`, jobs, {
		headers: { authToken },
	});
};

export const removeJob = async (slug, authToken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/job/${slug}`, {
		headers: { authToken },
	});
};

export const getJob = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/job/${slug}`);
};

export const updateJob = async (slug, job, authToken) => {
	return await axios.put(`${process.env.REACT_APP_API}/job/${slug}`, job, {
		headers: { authToken },
	});
};
