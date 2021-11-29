import axios from "axios";

export const getAllJobs = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/getJobs`);
};
