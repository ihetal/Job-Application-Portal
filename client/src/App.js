import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store.js";
import "./App.css";
import Home from "./components/HomePage/Home";
import LoginSignUp from "./components/LoginSignUp/UserLoginSignUp";
import Jobs from "./components/Jobs/Jobs";
import JobSearch from "./components/Jobs/JobSearch/JobSearch.js";
import JobOpening from "./components/Jobs/JobOpening.js";
import Profile from "./components/Profile/Profile.js";
import Forums from "./components/Forums/Forums.js";
import AddTopic from "./components/Forums/AddTopic.js";
import ViewTopic from "./components/Forums/ViewTopic.js";
import EmployerLogin from "./components/Employer/Login/EmployerLogin.js";
import EmployerProfile from "./components/Employer/Profile/Profile.js";
import Dashboard from "./components/Employer/Dashboard/Dashboard.js";
import AddJob from "./components/Employer/Dashboard/AddJob.js";
import ViewApplicants from "./components/Employer/Dashboard/ViewApplicants.js";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginSignUp} />
          <Route path="/signup" component={LoginSignUp} />
          <Route path="/employerlogin" component={EmployerLogin} />
          <Route path="/employersignup" component={EmployerLogin} />
          <Route path="/employerprofile" component={EmployerProfile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addjob" component={AddJob} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/jobsearch" component={JobSearch} />
          <Route path="/profile" component={Profile} />
          <Route path="/jobopening" component={JobOpening} />
          <Route path="/forum" component={Forums} />
          <Route path="/addtopic" component={AddTopic} />
          <Route path="/viewtopic" component={ViewTopic} />
          <Route path="/viewapplicants/:id" component={ViewApplicants} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
