import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJob } from "../functions/jobs";
import styled from "styled-components";

// Material UI
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
});

const initialState = {
  title: "",
  company: "",
  location: "",
  salary: "",
  description: "",
  contactEmail: "",
};

const JobDetails = () => {
  const classes = useStyles();
  // state
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const params = useParams();

  const { slug } = params;
  console.log(params);

  useEffect(() => {
    getJob(slug, user.token).then((p) => {
      setValues({ ...values, ...p.data });
    });
  }, [slug, user.token]);

  return (
    <StyledDashboard>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.heading} variant='h5' component='h2'>
              {values.title}
            </Typography>
            <Typography className={classes.subheading} color='textSecondary'>
              {values.company} - {values.location}
            </Typography>
            <Typography className={classes.subheading}>
              $
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(values.salary)}
              /year
            </Typography>
            <br />
            <Typography className={classes.subheading}>
              {values.description}...
            </Typography>
            <br />
            <Divider light />
            <br />
            <Typography className={classes.subheading}>
              Please contact {values.contactEmail} to apply
            </Typography>
          </CardContent>
        </Card>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  padding: 0 2rem;
`;

export default JobDetails;
