import React, { useState, useEffect } from "react";
import { getAllJobs } from "../functions/jobs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  root: {
    flexBasis: "32%",
    marginBottom: "2rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    border: "none",
    padding: "1rem",
  },
  formControl: {
    marginBottom: "2rem",
    width: "250px",
  },
});

const JobsAll = () => {
  const classes = useStyles();

  // state
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterJobs, setFilterJobs] = useState("");

  // Redux
  const { user } = useSelector((state) => ({ ...state }));
  const { search } = useLocation();

  useEffect(() => {
    if (search && filterJobs.trim()) {
      getAllJobs(user.token).then((res) => {
        setJobs(
          res.data.filter((job) => {
            return job.title.toLowerCase().includes(filterJobs.toLowerCase());
          })
        );
      });
    } else {
      setFilter("");
      setFilterJobs("");
      getAllJobs(user.token).then((res) => {
        // console.log(res);
        setJobs(res.data);
      });
    }
  }, [user.token, search, filterJobs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterJobs(filter);
  };

  // Pagination
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const noOfPages = Number(Math.ceil(jobs.length / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <StyledDashboard>
      <form className='form-container'>
        <FormControl className={classes.formControl}>
          <TextField
            type='text'
            label='search jobs'
            name='search'
            className='form-control'
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </FormControl>
        <Button
          onClick={handleSubmit}
          type='submit'
          variant='contained'
          color='secondary'
        >
          <Link to={`/jobs/?filter=${filter.trim()}`} className={classes.link}>
            Search
          </Link>
        </Button>
      </form>

      <div className={classes.container}>
        {jobs &&
          jobs
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((job) => (
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
                  <Typography>{job.description.substring(0, 80)}...</Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' variant='contained' color='primary'>
                    <Link
                      to={`/job/details/${job.slug}`}
                      className={classes.link}
                    >
                      Details
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            ))}
      </div>

      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        shape='rounded'
        count={noOfPages}
        page={page}
        onChange={handleChange}
        defaultPage={1}
      />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  padding: 0 2rem;
`;

export default JobsAll;
