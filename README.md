Contributors: Gareth Nakamurahee.jenna@gmail.comEric Manongdo
JOB POSTING DESIGN DOCUMENT

BRIEF:
The goal of this document is to highlight the core functionality of the Job Posting web application. Users can register, create posts, delete posts, and update posts through protected routes. Public users can view the landing page and register new accounts.

TOOLS:

- Authentication: Firebase

  - Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

- Database: MongoDB Atlas

  - MongoDB Atlas is a multi-cloud database service by the same people that build MongoDB. Atlas simplifies deploying and managing your databases while offering the versatility you need to build resilient and performant global applications on the cloud providers of your choice.

- Middleware: Node/Express

  - Node.js is an open source server environment that can generate dynamic page content, create, open, red, write, delete, and close files on the server, collect data, and also add, delete, and modify data in the database
  - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- Frontend: React

  - React is a Javascript library for building user interfaces

- State Management: Redux

  - Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

- Forms: Material UI

  - Material-UI is a library that allows us to import and use different components to create a user interface in our React applications.

- Stylesheet: styled-components
  - Styled-components is a library built for React and React Native developers. It allows you to use component-level styles in your applications. Styled-components leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.

API FUNCTION - AUTHENTICATION:

createOrUpdateUser()
Param: authToken from Firebase response
Resquest: authToken to validate if user is already in database, if not, create user
Response: Send back user object with info and store in redux

currentUser()
Param: authToken
Request: authToken to persist logged in users credentials in database
Response: Send back user object with info and store in redux

API FUNCTION - JOBS:

getAllJobs()
Param: authToken
Request: Send Headers
Response: Get all jobs from all users

getUsersJob()
Param: authToken
Request: Send Headers
Response: Get all the jobs created by logged in user

createJobs()
Param: jobs object, authToken
Request: Post new job to database
Response: Return successful message and new job

removeJob()
Param: slug, authToken
Request: Delete job from database based on matching slug
Response: Return successful response code

getJob()
Param: slug, authToken
Request: Send Headers with Slug
Response: Get complete job document based on matching slug

updateJob()
Param: slug, job object, authToken
Request: Update job based on slug with updated KVP’s in the database
Response: Return successful response code

FLOW:

- App.js (client-side)
  Set user state in Redux to be persisted throughout app
  Set up all page routes based on location and user authorization if required to access page, and renders the specified component

- React Components (client-side)
  Access user state from Redux
  Use React hooks to create and manage states within component
  Use API functions imported from the “functions” directory to make http requests to backend server through Axios

- Express
  Uses Express to handle incoming http requests and routing
  Uses express routing (defined in “routes” directory) to set up routes and execute middleware authentication (authCheck) and request handlers
  Request handler functions (defined in “controllers” directory) access MongoDB database and perform CRUD operations, then sends data as response to frontend to be used in React component

React component receives response from server and executes any code, then returns html with populated data to be rendered in App.js
