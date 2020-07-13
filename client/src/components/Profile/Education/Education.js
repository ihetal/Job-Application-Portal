import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetAuthorization } from "../../../actions/authActions";
import AddEducation from "./AddEducation.js";
import Institution from "./Institution.js";
import "./Education.css";
import EditEducation from "./EditEducation.js";
import axios from "axios";
export class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationDetails: [],
      toedit: "",
      tologin: false,
    };
  }
  componentDidMount() {
    axios
      .get("/userEducation")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            educationDetails: response.data.userEducation,
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
  deleteDetails = (id) => {
    const url = `/userEducation/${id}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            educationDetails: [
              ...this.state.educationDetails.filter(
                (details) => details._id !== id
              ),
            ],
          });
        }
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.responseMsg);
      });
  };

  addDetails = (details) => {
    this.setState({
      educationDetails: [...this.state.educationDetails, details],
    });
  };

  editClicked = (details) => {
    this.setState({
      toedit: details,
    });
  };
  closeEdit = () => {
    this.setState({
      toedit: "",
    });
  };
  editDetails = (details) => {
    this.setState({
      educationDetails: [
        ...this.state.educationDetails.filter(
          (edudetails) => edudetails._id !== details._id
        ),
      ],
    });
    setTimeout(() => {
      this.addDetails(details);
    }, 1000);
    this.closeEdit();
  };
  render() {
    let redirectvar = null;
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
      <div className="education">
        {redirectvar}
        <div>
          <div className="edu-header">
            <h1>Educational Details</h1>
            {this.state.toedit === "" ? (
              <AddEducation addDetails={this.addDetails} />
            ) : (
              <EditEducation
                closeEdit={this.closeEdit}
                editDetails={this.editDetails}
                details={this.state.toedit}
              />
            )}
          </div>
          <div className="edu-content">
            {this.state.educationDetails.length === 0 ? (
              <h3>Please add your educational details!</h3>
            ) : (
              <ul>
                {this.state.educationDetails.map((details) => {
                  return (
                    <Institution
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

export default connect(null, { resetAuthorization })(Education);
