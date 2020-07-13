import React, { Component } from "react";
import { connect } from "react-redux";
import { resetAuthorization } from "../../../actions/authActions";
import "./PersonalInformation.css";
import { countryList, states } from "../../../utils/Countries";
import axios from "axios";
import { Redirect } from "react-router-dom";
export class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      country: "",
      firstname: "",
      lastname: "",
      email: "",
      primaryphone: "",
      secondaryphone: "",
      street: "",
      door: "",
      state: "",
      city: "",
      zipcode: "",
      workexperience: undefined,
      availabilitytime: "",
      summary: "",
      filename: "Upload Resume",
      file: "",
      resume: "",
    };
  }
  componentDidMount() {
    axios
      .get("/profile/personalinfo")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            title: res.data.user.title || "",
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            email: res.data.user.email,
            primaryphone: res.data.user.primaryphone || "",
            secondaryphone: res.data.user.secondaryphone || "",
            workexperience: res.data.user.workexperience || undefined,
            availabilitytime: res.data.user.availabilitytime || "",
            summary: res.data.user.summary || "",
            resume: res.data.user.resume || "",
          });
          if (res.data.user.address !== undefined) {
            this.setState({
              street: res.data.user.address.street || "",
              door: res.data.user.address.door || "",
              country: res.data.user.address.country || "",
              state: res.data.user.address.state || "",
              city: res.data.user.address.city || "",
              zipcode: res.data.user.address.zipcode,
            });
          }
        }
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          alert(err.response.data.responseMsg);
          this.props.resetAuthorization(err.response.data.responseMsg);
        } else {
          alert(err.response.data.responseMsg);
        }
      });
  }

  getCountries = () => {
    let country = countryList.map((count) => {
      return (
        <option key={count.code} value={count.name}>
          {count.name}
        </option>
      );
    });
    return country;
  };
  getStates = () => {
    if (
      states[this.state.country] !== "" &&
      states[this.state.country] !== undefined
    ) {
      let statesList = states[this.state.country].split("|");
      let listofstates = statesList
        .filter((stateName) => stateName !== "")
        .map((stateValue) => {
          return <option value={stateValue}>{stateValue}</option>;
        });
      return listofstates;
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
      filename: event.target.files[0].name,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/profile/personalinfo", this.state)
      .then((res) => {
        if (res.status === 200) alert(res.data.responseMsg);
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          this.props.resetAuthorization(err.response.data.responseMsg);
        } else {
          alert(err.response.data.responseMsg);
        }
      });
  };
  submitSummary = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("resume", this.state.file);
    formData.append("summary", this.state.summary);
    axios
      .post("/profile/updatesummary", formData)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            resume: res.data.file,
          });
          alert(res.data.responseMsg);
        }
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          this.props.resetAuthorization(err.response.data.responseMsg);
        } else {
          alert(err.response.data.responseMsg);
        }
      });
  };
  render() {
    let showCountries = this.getCountries();
    let showStates = this.getStates();
    let redirectvar = null;
    if (!this.props.isAuthenticated) {
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
      <div className="personalinfo">
        {redirectvar}
        <div>
          <div className="pi-header">
            <h1>Personal Details</h1>
          </div>
          <div className="pi-form">
            <form onSubmit={this.onSubmit}>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-phone-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Primary Phone"
                    name="primaryphone"
                    value={this.state.primaryphone}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-mobile-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Secondary Phone"
                    name="secondaryphone"
                    value={this.state.secondaryphone}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Street Address"
                    name="street"
                    value={this.state.street}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Apartment,Suite,Floor"
                    name="door"
                    value={this.state.door}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-globe"></i>
                    </span>
                  </div>
                  <select
                    class="custom-select"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChange}
                  >
                    <option defaultValue disabled value="">
                      Country
                    </option>
                    {showCountries}
                  </select>
                </div>
                <div className="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-globe"></i>
                    </span>
                  </div>
                  <select
                    class="custom-select"
                    name="state"
                    value={this.state.state}
                    onChange={this.onChange}
                  >
                    <option defaultValue disabled value="">
                      State
                    </option>
                    {showStates}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-city"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                </div>
                <div class="col mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Zipcode"
                    name="zipcode"
                    value={this.state.zipcode}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-history"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Work Experience(in months)"
                    name="workexperience"
                    value={this.state.workexperience}
                    onChange={this.onChange}
                  />
                </div>
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-clock"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Availablity Time"
                    name="availabilitytime"
                    value={this.state.availabilitytime}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <button
                class="btn btn-primary"
                type="submit"
                onSubmit={this.onSubmit}
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
        <div style={{ width: "500px" }}>
          <div className="header">
            <h1>Summary</h1>
          </div>
          <div className="summary-form">
            <form onSubmit={this.submitSummary}>
              <div class="col">
                <textarea
                  class="form-control"
                  rows="10"
                  placeholder="Brief Summary about yourself"
                  name="summary"
                  value={this.state.summary}
                  onChange={this.onChange}
                ></textarea>
              </div>
              <div class="col" style={{ textAlign: "left" }}>
                {this.state.resume !== "" ? (
                  <a
                    href={`https://divyang-files.s3-us-west-1.amazonaws.com/${this.state.resume}`}
                  >
                    Uploaded Resume
                  </a>
                ) : null}
              </div>
              <div class=" col input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile02"
                    name="resume"
                    onChange={this.onFileChange}
                    required
                  />
                  <label class="custom-file-label" for="inputGroupFile02">
                    {this.state.filename}
                  </label>
                </div>
              </div>
              <br />
              <button
                class="btn btn-primary"
                type="submit"
                onSubmit={this.submitSummary}
              >
                Update Summary
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStatetoProps, { resetAuthorization })(
  PersonalInformation
);
