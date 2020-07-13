import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setcurrentjob } from "../../../actions/jobActions";
export class RecommendedJobs extends Component {
  setCurrentJob = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.props.setcurrentjob(this.props.job);
  };
  render() {
    return (
      <div>
        <li>
          <Link to="/jobopening" onClick={this.setCurrentJob}>
            {this.props.job.title}
          </Link>
        </li>
      </div>
    );
  }
}

export default connect(null, { setcurrentjob })(RecommendedJobs);
