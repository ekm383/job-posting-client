import React from "react";
import JobCard from "../components/JobCard";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <StyledDashboard>
      <JobCard />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  padding: 0 2rem;
`;

export default Dashboard;
