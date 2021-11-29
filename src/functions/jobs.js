import axios from "axios";

export const getAllJobs = async () => {
	return await axios.post(`${process.env.REACT_APP_API}/getJobs`);
};
