import React, { Component } from "react";
import "./Dashboard.css";
export class ApplicantProfile extends Component {
  render() {
    return (
      <div class="container">
        <div class="topic__description">
          <div class="description">
            <div class="topic__avatar">
              {this.props.applicant.profilepicture ? (
                <img
                  src={`https://divyang-files.s3.us-west-1.amazonaws.com/${this.props.applicant.profilepicture}`}
                  class="usericon"
                  alt="avatar"
                />
              ) : (
                <img
                  src={`https://divyang-files.s3.us-west-1.amazonaws.com/default.png`}
                  class="usericon"
                  alt="avatar"
                />
              )}
            </div>
            <div class="topic__caption">
              <div class="topic__user">
                {this.props.applicant.firstname} {this.props.applicant.lastname}
              </div>
              <div class="topic__date">
                {this.props.applicant.resume !== "" ? (
                  <a
                    href={`https://divyang-files.s3-us-west-1.amazonaws.com/${this.props.applicant.resume}`}
                  >
                    Resume
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div class="topic__comments">
            <p>
              {this.props.applicant.summary}
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantProfile;
