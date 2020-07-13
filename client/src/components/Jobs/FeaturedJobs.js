import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setcurrentjob } from "../../actions/jobActions";
import featurespic from "./featured1.jpg";
import companylogo from "./company-1.png";
export class FeaturedJobs extends Component {
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
      <div class="col-lg-4 mb-5 mb-lg-0">
        <div class="box-image-text bg-visible full-height">
          <div class="top">
            <Link to="/jobopening" onClick={this.setCurrentJob}>
              <div class="image">
                <img src={featurespic} alt="" class="img-fluid" />
              </div>
              <div class="bg"></div>
              <div class="logo">
                <img src={companylogo} alt="" style={{ maxWidth: "80px" }} />
              </div>
            </Link>
          </div>
          <div class="content" style={{ height: "100px" }}>
            <h5 class="h5">
              <Link to="/jobopening" onClick={this.setCurrentJob}>
                {this.props.job.title}
              </Link>
            </h5>
            <p class="featured__details">
              <i class="fa fa-map-marker job__location"></i>
              {this.props.job.city},{this.props.job.state}
              {jobType}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { setcurrentjob })(FeaturedJobs);
