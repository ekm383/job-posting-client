import React from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function Post() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<Input
				placeholder="Job Title"
				inputProps={{ "aria-label": "title" }}
			/>
			<Input
				placeholder="Company Name"
				inputProps={{ "aria-label": "company" }}
			/>
			<Input
				placeholder="Job Location"
				inputProps={{ "aria-label": "location" }}
			/>
			<Input
				placeholder="Annual Salary"
				inputProps={{ "aria-label": "salary" }}
			/>
			<Input
				placeholder="Job Description"
				inputProps={{ "aria-label": "description" }}
			/>
			<Input
				placeholder="Contact Email"
				inputProps={{ "aria-label": "contactEmail" }}
			/>
			<Button size="small" variant="contained" color="primary">
				Submit
			</Button>
		</form>
	);
}

// import React from "react";

// class Post extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			title: "",
// 			company: "",
// 			location: "",
// 			salary: "",
// 			description: "",
// 			contactEmail: "",
// 		};
// 		this.changeHandler = (event) => {
// 			// console.log(event.target.value);
// 			console.log(this.state);
// 			this.setState((previousState) => {
// 				// return (previousState[event.target.name] = event.target.value);
// 				if (event.target.name === "title") {
// 					return { title: event.target.value };
// 				} else if (event.target.name === "company") {
// 					return { company: event.target.value };
// 				} else if (event.target.name === "location") {
// 					return { location: event.target.value };
// 				} else if (event.target.name === "salary") {
// 					return { salary: event.target.value };
// 				} else if (event.target.name === "description") {
// 					return { description: event.target.value };
// 				} else if (event.target.name === "contactEmail") {
// 					return { contactEmail: event.target.value };
// 				}
// 			});
// 		};
// 		this.submitHandler = (event) => {
// 			console.log("clicked");
// 			event.preventDefault();
// 			console.log(this.state);
// 		};
// 	}
// 	render() {
// 		console.log(this.state);
// 		const { title, company, location, salary, description, contactEmail } =
// 			this.state;
// 		return (
// 			<div>
// 				<form>
// 					<div>
// 						<label htmlFor="title">Job Title</label>
// 						<input
// 							name="title"
// 							type="text"
// 							value={title}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="company">Company Name</label>
// 						<input
// 							name="company"
// 							type="text"
// 							value={company}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="location">Job Location</label>
// 						<input
// 							name="location"
// 							type="text"
// 							value={location}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>

// 					<div>
// 						<label htmlFor="salary">Salary</label>
// 						<input
// 							name="salary"
// 							type="text"
// 							value={salary}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>

// 					<div>
// 						<label htmlFor="description">Job Description</label>
// 						<input
// 							name="description"
// 							type="text"
// 							value={description}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="contactEmail">Contact Email</label>
// 						<input
// 							name="contactEmail"
// 							type="email"
// 							value={contactEmail}
// 							onChange={this.changeHandler}
// 						/>
// 					</div>
// 				</form>
// 				<button type="submit">Submit</button>
// 			</div>
// 		);
// 	}
// }

// export default Post;
