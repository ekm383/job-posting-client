// import React from "react";
// import Login from "../pages/auth/Login";
// import styled from "styled-components";

// const Index = () => {
//   return (
//     <StyledIndex>
//       <div className='hero'>
//         <div className='hero-copy'>
//           <h1>Jump Start Your Career</h1>
//           <p>
//             We're here to help, with thousands of open positions, resume
//             assessments, job fit scoring, and tons of relevant career advice.{" "}
//           </p>
//         </div>
//       </div>
//       <div>
//         <Login />
//       </div>
//     </StyledIndex>
//   );
// };

// const StyledIndex = styled.div`
//   .hero {
//     width: 100vw;
//     height: 600px;
//     margin-top: -2rem;
//     background: url("/header-bg.jpg") center;
//     .hero-copy {
//       margin-left: 3rem;
//       height: 100%;
//       width: 50%;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: flex-start;
//       color: var(--primary);
//       h1 {
//         font-size: 5rem;
//         line-height: 4.5rem;
//         text-transform: uppercase;
//         font-weight: 700;
//         text-shadow: 1px 3px 5px var(--lightGray);
//         margin-bottom: 2rem;
//       }
//       p {
//         font-size: 1.2rem;
//         line-height: 2rem;
//       }
//     }
//   }
// `;

// export default Index;

// -----

import React from "react";
import Login from "../pages/auth/Login";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

const Index = () => {
	return (
		<StyledIndex>
			<div className="hero">
				<div className="hero-copy">
					<h1>
						Now Hiring
						<Typewriter
							options={{
								strings: [
									"Photographers!",
									"Chefs!",
									"Landscapers!",
									"Teachers!",
									"Writers!",
									"Pilots!",
									"Stylists!",
									"Programmers!",
									"Surgeons!",
									"Musicians!",
								],
								autoStart: true,
								loop: true,
								pauseFor: 1000,
							}}
						/>
					</h1>
					<p>
						We're here to help, with thousands of open positions,
						resume assessments, job fit scoring, and tons of
						relevant career advice.{" "}
					</p>
				</div>
			</div>
			<div>
				<Login />
			</div>
		</StyledIndex>
	);
};

const StyledIndex = styled.div`
	.hero {
		width: 100vw;
		height: 600px;
		margin-top: -2rem;
		background: url("/header-bg.jpg") center;
		.hero-copy {
			margin-left: 3rem;
			height: 100%;
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			color: var(--primary);
			h1 {
				font-size: 5rem;
				line-height: 4.5rem;
				text-transform: uppercase;
				font-weight: 700;
				text-shadow: 1px 3px 5px var(--lightGray);
				margin-bottom: 2rem;
			}
			p {
				font-size: 1.2rem;
				line-height: 2rem;
			}
		}
	}
`;

export default Index;
