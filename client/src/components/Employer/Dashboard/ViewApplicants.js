import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetAuthorization } from "../../../actions/authActions";
import axios from "axios";
import Header from "../../Header";
import DashboardHeader from "./DashboardHeader";
import ApplicantProfile from "./ApplicantProfile";
import "./Dashboard.css";

export class ViewApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobdetails: "",
      applicants: "",
    };
  }
  componentDidMount() {
    this.setState({
      jobdetails: this.props.applications.filter(
        (application) => application.id === parseInt(this.props.match.params.id)
      ),
    });
    const url = `/viewapplicants/${this.props.match.params.id}`;
    axios
      .get(url)
      .then((response) => {
        this.setState({ applicants: response.data.applicants });
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          alert(err.response.data.responseMsg);
          this.props.resetAuthorization("");
        } else {
          alert(err.response.data.responseMsg);
        }
      });
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
    let viewapplicantbanner = null;
    let applicants = null;
    if (this.state.jobdetails.length !== 0) {
      viewapplicantbanner = (
        <div class="container topics">
          <div class="topics__heading">
            <h2 class="topics__heading-title">
              {this.state.jobdetails[0].title}
            </h2>
            <p>{this.state.jobdetails[0].description}</p>
            <div class="tags">{this.state.jobdetails[0].jobtype}</div>
          </div>
        </div>
      );
    }
    if (this.state.applicants.length !== 0) {
      applicants = (
        <React.Fragment>
          <br />
          <div class="tags">Applicants</div>
          {this.state.applicants.map((applicant) => {
            return <ApplicantProfile applicant={applicant} />;
          })}
        </React.Fragment>
      );
    }
    return (
      <div>
        {redirectvar}
        <Header />
        <DashboardHeader />
        {viewapplicantbanner}
        {applicants}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    applications: state.jobs.applications,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { resetAuthorization })(ViewApplicants);
