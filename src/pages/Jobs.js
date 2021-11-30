import React from "react";
import styled from "styled-components";

const Jobs = () => {
	return (
		<StyledJobs>
			<ul>
				<li>Display Job Cards without Edit button</li>
				<li>Paginate the response to show max 9 cards</li>
			</ul>
		</StyledJobs>
	);
};

const StyledJobs = styled.div`
	padding: 0 2rem;
`;

export default Jobs;
