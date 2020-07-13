import React, { Component } from "react";
import { connect } from "react-redux";
import { resetAuthorization } from "../../actions/authActions";
import { getRecommendedJobs } from "../../actions/jobActions";
import axios from "axios";
import Header from "../Header";
import FeaturedJobs from "./FeaturedJobs.js";
export class JobOpening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasApplied: false,
    };
  }
  componentDidMount() {
    this.props.getRecommendedJobs(this.props.currentjob.id);
  }
  onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/application", this.props.currentjob)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.setState({
              hasApplied: true,
            });
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          this.props.resetAuthorization(err.response.data.responseMsg);
          alert(err.response.data.responseMsg);
        } else {
          alert(err.response.data.responseMsg);
        }
      });
  };
  render() {
    console.log(this.props.currentjob);
    let jobType = null;
    if (this.props.currentjob.jobtype === "Full Time")
      jobType = (
        <span class="badge featured-badge badge-success">Full time</span>
      );
    else if (this.props.currentjob.jobtype === "Part Time")
      jobType = (
        <span class="badge featured-badge badge-primary">Part time</span>
      );
    else
      jobType = (
        <span
          style={{ color: "#ffffff" }}
          class="badge featured-badge badge-warning"
        >
          Internship
        </span>
      );
    let button = null;
    if (
      this.state.hasApplied ||
      (this.props.currentjob.applications !== undefined &&
        this.props.currentjob.applications.length !== 0)
    ) {
      button = (
        <input
          type="button"
          class="btn btn-outline-white-primary"
          value="Applied"
        />
      );
    } else {
      button = (
        <input
          type="submit"
          class="btn btn-outline-white-primary"
          value="Apply for this job"
          onClick={this.onSubmit}
        />
      );
    }
    return (
      <div>
        <Header />
        <section class="bg-light-gray">
          <div class="container">
            <h1 class="heading">
              {this.props.currentjob.title}
              <br />
            </h1>
            <div class="job-detail-description">
              <i class="fa fa-map-marker job__location"> </i>
              {this.props.currentjob.city}, {this.props.currentjob.state}
              {jobType}
              <br />
              <br />
            </div>
          </div>
        </section>
        <section style={{ background: "white" }}>
          <div
            class="container"
            style={{ paddingTop: "50px", textAlign: "left" }}
          >
            <div style={{ textAlign: "left" }}>
              <h5 class="text-info h5">Salary: Negotiable</h5>
              <blockquote class="blockquote">
                <p>{this.props.currentjob.description}</p>
              </blockquote>
            </div>
            <div
              class="job-detail__apply-bottom mx-auto"
              id={this.props.currentjob.id}
            >
              {button}
              <br />
            </div>
          </div>
        </section>
        <section class="bg-light-gray">
          <div class="container">
            {this.props.recommendedjobs.length !== 0 ? (
              <React.Fragment>
                <h3 class="heading h3">Featured jobs</h3>
                <div class="row featured align-items-stretch">
                  {this.props.recommendedjobs.map((job) => {
                    return <FeaturedJobs job={job} />;
                  })}
                </div>
              </React.Fragment>
            ) : null}
          </div>
          <br />
        </section>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    featuredjobs: state.jobs.jobopenings,
    currentjob: state.jobs.currentjob,
    recommendedjobs: state.jobs.recommendedjobs,
  };
};
export default connect(mapStatetoProps, {
  resetAuthorization,
  getRecommendedJobs,
})(JobOpening);
