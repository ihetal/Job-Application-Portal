import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { fetchApplications } from "../../../actions/jobActions";
import { setError } from "../../../actions/authActions";
import { connect } from "react-redux";
import Header from "../../Header";
import DashboardHeader from "./DashboardHeader";
import Application from "./Application";
import pinned from "./img/Pinned.svg";
import "./Dashboard.css";
export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchApplications();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors && this.props.errors !== "") {
      setTimeout(() => {
        this.props.setError("");
      }, 400);
    }
  }
  render() {
    let redirectvar = null;
    if (!this.props.isAuthenticated) {
      redirectvar = (
        <Redirect
          to={{
            pathname: "/employerlogin",
            state: { login: true },
          }}
        ></Redirect>
      );
    }
    return (
      <div>
        {redirectvar}
        <Header />
        <DashboardHeader />
        <br />
        <section>
          <div
            class="table-responsive container "
            style={{ background: "white", padding: "0px" }}
          >
            <table class="table table-hover">
              <thead class="thead-dark">
                <tr>
                  <th style={{ width: "65%" }}>Jobs Posted</th>
                  <th class="align-middle">Job Type</th>
                  <th class="align-left">Posted At</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#fef2e0" }}>
                  <td class="text-left posts__content">
                    <div class="posts__content">
                      <h4 style={{ textDecoration: "none" }}>
                        <img src={pinned} alt="pinned" />
                        Welcome Employers! Please use this to manage candidate
                        applications.
                      </h4>
                      <p style={{ paddingLeft: "30px" }}>
                        {" "}
                        You can use this dashboard to post jobs and view
                        applicants and their profile for each job posting.
                      </p>
                    </div>
                  </td>
                  <td class="align-middle"></td>
                  <td class="align-middle"></td>
                </tr>
                {this.props.applications.map((application) => {
                  return (
                    <Application
                      key={application._id}
                      application={application}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.jobs.applications,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
  };
};
export default connect(mapStateToProps, { fetchApplications, setError })(
  Dashboard
);
