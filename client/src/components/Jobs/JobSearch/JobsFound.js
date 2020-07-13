import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setcurrentjob } from "../../../actions/jobActions";
import logo from "../company-1.png";
export class JobsFound extends Component {
  setCurrentJob = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.props.setcurrentjob(this.props.job);
  };
  render() {
    let jobType = null;
    if (this.props.job.jobtype === "Full Time")
      jobType = (
        <span class="badge featured-badge badge-success">Full time</span>
      );
    else if (this.props.job.jobtype === "Part Time")
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
    return (
      <React.Fragment>
        <div class="jobpost">
          <div class="logo">
            <img src={logo} class="img-fluid" alt="logo" />
          </div>
          <div class="details">
            <h4>
              {this.props.job.userid}
              {this.props.job.title}
            </h4>
            <p>
              {this.props.job.description.substring(0, 100)}...{" "}
              <Link to="/jobopening" onClick={this.setCurrentJob}>
                read more
              </Link>
            </p>
          </div>
          <div class="location">
            <i class="fa fa-map-marker job__location"></i>
            <p>
              {this.props.job.city}, {this.props.job.state}
            </p>
            {jobType}
          </div>
        </div>
        <div class="clearfix"></div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setcurrentjob })(JobsFound);
