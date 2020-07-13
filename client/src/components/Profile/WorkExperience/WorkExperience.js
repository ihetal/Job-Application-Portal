import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetAuthorization } from "../../../actions/authActions";
import axios from "axios";
import AddExperience from "./AddExperience.js";
import EditExperience from "./EditExperience.js";
import Companies from "./Companies.js";
import "./WorkExperience.css";
export class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workDetails: [],
      toedit: "",
      tologin: false,
    };
  }

  componentDidMount() {
    axios
      .get("/workExperience")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            workDetails: response.data.workExperience,
          });
        }
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          alert(err.response.data.responseMsg);
          this.props.resetAuthorization(err.response.data.responseMsg);
          this.setState({ tologin: true });
        } else {
          alert(err.response.data.responseMsg);
        }
      });
  }

  addDetails = (details) => {
    this.setState({
      workDetails: [...this.state.workDetails, details],
    });
  };

  deleteDetails = (id) => {
    const url = `/workExperience/${id}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            workDetails: [
              ...this.state.workDetails.filter((details) => details._id !== id),
            ],
          });
        }
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.responseMsg);
      });
  };
  editClicked = (details) => {
    this.setState({
      toedit: details,
    });
  };
  editDetails = (details) => {
    this.setState({
      workDetails: [
        ...this.state.workDetails.filter(
          (workExpDetails) => workExpDetails._id !== details._id
        ),
      ],
    });
    setTimeout(() => {
      this.addDetails(details);
    }, 1000);
    this.closeEdit();
  };
  closeEdit = () => {
    this.setState({
      toedit: "",
    });
  };
  render() {
    let redirectvar = null;
    console.log(this.state.tologin);
    if (this.state.tologin) {
      redirectvar = (
        <Redirect
          to={{
            pathname: "/login",
            state: { login: true },
          }}
        ></Redirect>
      );
    }
    return (
      <div className="workexp">
        {redirectvar}
        <div>
          <div className="work-header">
            <h1>Work Experience</h1>
            {this.state.toedit === "" ? (
              <AddExperience addDetails={this.addDetails} />
            ) : (
              <EditExperience
                closeEdit={this.closeEdit}
                editDetails={this.editDetails}
                details={this.state.toedit}
              />
            )}
          </div>
          <div className="work-content">
            {this.state.workDetails.length === 0 ? (
              <h3>Please add your Work Experience!</h3>
            ) : (
              <ul>
                {this.state.workDetails.map((details) => {
                  return (
                    <Companies
                      key={details._id}
                      details={details}
                      deleteDetails={this.deleteDetails}
                      editClicked={this.editClicked}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { resetAuthorization })(WorkExperience);
