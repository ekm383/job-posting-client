import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    width: "600px",
    margin: "0 auto",
  },
  formControl: {
    width: "100%",
    marginBottom: "1rem",
  },
  buttonContainer: {
    float: "right",
  },
}));

const CreateJobForm = ({ handleSubmit, handleChange, values }) => {
  const { title, company, location, salary, description, contactEmail } =
    values;

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <h2 style={{ marginBottom: "2rem" }}>Create Job</h2>
      <FormControl className={classes.formControl}>
        <TextField
          type='text'
          label='Title'
          name='title'
          className='form-control'
          variant='outlined'
          value={title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type='text'
          label='Company'
          name='company'
          className='form-control'
          variant='outlined'
          value={company}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type='text'
          label='Location'
          name='location'
          className='form-control'
          variant='outlined'
          value={location}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type='number'
          label='Salary'
          name='salary'
          className='form-control'
          variant='outlined'
          value={salary}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type='text'
          label='Description'
          name='description'
          className='form-control'
          variant='outlined'
          multiline
          maxRows={5}
          value={description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type='text'
          label='Contact Info'
          name='contactEmail'
          className='form-control'
          variant='outlined'
          value={contactEmail}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <div className={classes.buttonContainer}>
        <Link
          style={{
            color: "var(--lightGray)",
            textTransform: "uppercase",
            fontSize: ".9rem",
            marginRight: "1rem",
          }}
          to='/dashboard'
        >
          Cancel
        </Link>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateJobForm;
