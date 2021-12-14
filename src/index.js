import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import NavBar from "./NavBar";
import Register from "./Register";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import CreateJob from "./CreateJob";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element = {<Home />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/login" element = {<LogIn />} />
      <Route path="/dashboard/:username" element = {<Dashboard />} />
      <Route path="/createjob" element = {<CreateJob />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
