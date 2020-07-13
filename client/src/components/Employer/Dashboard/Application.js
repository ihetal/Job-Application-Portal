import React, { Component } from "react";
import { Link } from "react-router-dom";
import jobposting from "./img/jobposting.png";
import "./Dashboard.css";

export class Application extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
          <td class="text-left">
            <div class="jobpostings">
              <h4>
                <img src={jobposting} alt="pinned" />
                <Link
                  class="link"
                  onClick={this.onClick}
                  to={`viewapplicants/${this.props.application.id}`}
                >
                  {this.props.application.title}
                </Link>
              </h4>

              <p>{this.props.application.description.substring(0, 100)}</p>
            </div>
          </td>
          <td class="align-middle">{this.props.application.jobtype}</td>

          <td class="align-middle">{this.props.application.timestamp}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Application;
