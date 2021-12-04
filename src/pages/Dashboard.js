import React, { useState, useEffect } from "react";
import { getUsersJobs, removeJob } from "../functions/jobs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
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
    flexWrap: "wrap",
  },
  root: {
    flexBasis: "31.33%",
    marginBottom: "2rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    border: "none",
    padding: "1rem",
    margin: "1%",
  },
});

const Dashboard = () => {
  const classes = useStyles();

  // state
  const [jobs, setJobs] = useState([]);
  const [reload, setReload] = useState(true);

  const toggle = () => setReload(!reload);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    return getUsersJobs(user.token).then((res) => {
      setJobs(res.data);
    });
  }, [user.token, reload]);

  const handleRemove = (slug) => {
    let answer = window.confirm("Are you sure?");
    if (answer) {
      removeJob(slug, user.token)
        .then((res) => {
          getUsersJobs(user.token);
          toast.error(`${res.data.title} is deleted`);
          toggle();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
          console.log(err);
        });
    }
  };

  return (
    <StyledDashboard>
      <h4>
        You Created{" "}
        {jobs.length > 1 ? `${jobs.length} Jobs` : `${jobs.length} Job`}{" "}
      </h4>
      <div className={classes.container}>
        {jobs &&
          jobs.map((job) => (
            <Card key={job._id} className={classes.root} variant='outlined'>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  {job.title}
                </Typography>
                <Typography className={classes.title} color='textSecondary'>
                  {job.company} - {job.location}
                </Typography>
                <Typography>
                  $
                  {new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(job.salary)}
                  /year
                </Typography>
                <br />
                <Typography component='p'>
                  {job.description.substring(0, 80)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' variant='contained' color='primary'>
                  <Link to={`/user/job/${job.slug}`} className={classes.link}>
                    Edit
                  </Link>
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  color='secondary'
                  onClick={() => handleRemove(job.slug)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  padding: 0 2rem;
  h4 {
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

export default Dashboard;
