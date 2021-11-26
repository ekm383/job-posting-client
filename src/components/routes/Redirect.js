import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate.push("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <StyledRedirect>
      <p>Sorry, redirecting in {count} seconds</p>
    </StyledRedirect>
  );
};

const StyledRedirect = styled.div`
  height: 50vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingToRedirect;
