import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createJobs } from "../functions/jobs";
import CreateJobForm from "../components/Forms/CreateJobForm";

const initialState = {
  title: "",
  company: "",
  location: "",
  salary: "",
  description: "",
  contactEmail: "",
};

const JobCreate = () => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createJobs(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <div>
          <CreateJobForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCreate;
