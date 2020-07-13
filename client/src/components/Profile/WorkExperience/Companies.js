import React, { Component } from "react";
import "./Companies.css";
export class Companies extends Component {
  render() {
    return (
      <div className="companies">
        <li>
          <em>
            {this.props.details.startmonth}/{this.props.details.startyear} -{" "}
            {this.props.details.endmonth === "" ? (
              "Present"
            ) : (
              <React.Fragment>
                {this.props.details.endmonth}/{this.props.details.endyear}
              </React.Fragment>
            )}
          </em>
          <p>
            <b>Title :</b> {this.props.details.title} <br />
            <b>Employment Type :</b> {this.props.details.employmenttype} <br />
            <b>Company :</b> {this.props.details.company} <br />
            {this.props.details.description ? (
              <React.Fragment>
                <b>Description :</b> {this.props.details.description} <br />
              </React.Fragment>
            ) : (
              ""
            )}
            <br />
            <br />
            <button
              onClick={this.props.editClicked.bind(this, this.props.details)}
              className="close"
            >
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button
              onClick={this.props.deleteDetails.bind(
                this,
                this.props.details._id
              )}
              className="close"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </p>
        </li>
      </div>
    );
  }
}

export default Companies;
