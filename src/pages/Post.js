import React from "react";

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			company: "",
			location: "",
			salary: "",
			description: "",
			contactEmail: "",
		};
		this.changeHandler = (event) => {
			// console.log(event.target.value);
			console.log(this.state);
			this.setState((previousState) => {
				// return (previousState[event.target.name] = event.target.value);
				if (event.target.name === "title") {
					return { title: event.target.value };
				} else if (event.target.name === "company") {
					return { company: event.target.value };
				} else if (event.target.name === "location") {
					return { location: event.target.value };
				} else if (event.target.name === "salary") {
					return { salary: event.target.value };
				} else if (event.target.name === "description") {
					return { description: event.target.value };
				} else if (event.target.name === "contactEmail") {
					return { contactEmail: event.target.value };
				}
			});
		};
		this.submitHandler = (event) => {
			console.log("clicked");
			event.preventDefault();
			console.log(this.state);
		};
	}
	render() {
		console.log(this.state);
		const { title, company, location, salary, description, contactEmail } =
			this.state;
		return (
			<div>
				<form>
					<div>
						<label htmlFor="title">Job Title</label>
						<input
							name="title"
							type="text"
							value={title}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label htmlFor="company">Company Name</label>
						<input
							name="company"
							type="text"
							value={company}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label htmlFor="location">Job Location</label>
						<input
							name="location"
							type="text"
							value={location}
							onChange={this.changeHandler}
						/>
					</div>

					<div>
						<label htmlFor="salary">Salary</label>
						<input
							name="salary"
							type="text"
							value={salary}
							onChange={this.changeHandler}
						/>
					</div>

					<div>
						<label htmlFor="description">Job Description</label>
						<input
							name="description"
							type="text"
							value={description}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label htmlFor="contactEmail">Contact Email</label>
						<input
							name="contactEmail"
							type="email"
							value={contactEmail}
							onChange={this.changeHandler}
						/>
					</div>
				</form>
				<button type="submit">Submit</button>
			</div>
		);
	}
}

export default Post;
