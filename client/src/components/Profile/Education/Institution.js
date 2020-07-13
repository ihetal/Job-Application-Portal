import React, { Component } from "react";
import "./Institution.css";
export class Institution extends Component {
  render() {
    return (
      <div>
        <li style={{ listStyle: "none" }}>
          <em
            style={{
              fontWeight: "bold",
              textAlign: "right",
              right: "25px",
              display: "inline",
              position: "absolute",
            }}
          >
            {this.props.details.startyear} - {this.props.details.endyear}
          </em>
          <p style={{ textAlign: "justify", borderBottom: "1px solid grey" }}>
            <b>Institution :</b> {this.props.details.institution} <br />
            <b>Degree :</b> {this.props.details.degree} <br />
            <b>Major :</b> {this.props.details.major} <br />
            {this.props.details.grade ? (
              <React.Fragment>
                <b>Grade :</b> {this.props.details.grade} <br />
              </React.Fragment>
            ) : (
              ""
            )}
            {this.props.details.activities ? (
              <React.Fragment>
                <b>Activities and Socities :</b> {this.props.details.activities}{" "}
                <br />
              </React.Fragment>
            ) : (
              ""
            )}
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

export default Institution;
