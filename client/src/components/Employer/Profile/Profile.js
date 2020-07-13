import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { countryList, states } from "../../../utils/Countries";
import { connect } from "react-redux";
import { resetAuthorization } from "../../../actions/authActions";
import axios from "axios";
import Header from "../../Header";
import "./Profile.css";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      firstname: "",
      lastname: "",
      email: "",
      primaryphone: "",
      secondaryphone: "",
      street: "",
      street2: "",
      state: "",
      city: "",
      zipcode: "",
    };
  }
  componentDidMount() {
    axios
      .get("/employerinfo")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.user.companyname,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            email: res.data.user.email,
            primaryphone: res.data.user.primaryphone || "",
            secondaryphone: res.data.user.secondaryphone || "",
          });
          if (res.data.user.companyaddress !== undefined) {
            this.setState({
              street: res.data.user.companyaddress.street || "",
              street2: res.data.user.companyaddress.street2 || "",
              country: res.data.user.companyaddress.country || "",
              state: res.data.user.companyaddress.state || "",
              city: res.data.user.companyaddress.city || "",
              zipcode: res.data.user.companyaddress.zipcode,
            });
          }
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

  onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/employerinfo", this.state)
      .then((res) => {
        if (res.status === 200) alert(res.data.responseMsg);
      })
      .catch((err) => {
        if (err.response.data.authenticated !== undefined) {
          this.props.resetAuthorization(err.response.data.responseMsg);
        } else {
          alert(err.responseMsg.data.responseMsg);
        }
      });
  };

  render() {
    let showCountries = this.getCountries();
    let showStates = this.getStates();
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
      <div>
        {redirectvar}
        <Header />
        <section class="profile-banner">
          <div class="container">
            <div class="row">
              <div class="mx-auto">
                <h1 class="emp__profileheader">Profile Information</h1>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="container formcontainer">
            <form onSubmit={this.onSubmit}>
              <div class="form-row">
                <div class="col input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-building"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Company Name"
                    name="companyname"
                    value={this.state.companyname}
                    onChange={this.onChange}
                    required
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
                    placeholder="Company Address"
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
                    placeholder="Street Address 2"
                    name="street2"
                    value={this.state.street2}
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

              <button
                class="btn btn-primary"
                type="submit"
                onSubmit={this.onSubmit}
              >
                Save Details
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null, { resetAuthorization })(Profile);
