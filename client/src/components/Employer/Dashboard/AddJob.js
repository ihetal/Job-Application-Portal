import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { countryList, states } from "../../../utils/Countries";
import { addopening } from "../../../actions/jobActions";
import { setError } from "../../../actions/authActions";
import { connect } from "react-redux";
import newTopic from "./img/newtopic.png";
import "./Dashboard.css";
export class AddJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      jobtype: "",
      description: "",
      companyname: "",
      companydescription: "",
      applicationurl: "",
      newjobposted: false,
      gotohome: false,
      errorMessage: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newjobposted !== this.props.newjobposted) {
      this.setState({
        newjobposted: true,
      });
    }
    if (prevProps.errors !== this.props.errors && this.props.errors !== "") {
      alert(this.props.errors);
      setTimeout(() => {
        this.props.setError("");
      }, 400);
    }
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
    this.props.addopening(this.state);
  };
  onClick = () => {
    this.setState({
      gotohome: true,
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
            pathname: "/employerlogin",
            state: { login: true },
          }}
        ></Redirect>
      );
    } else if (this.state.newjobposted || this.state.gotohome) {
      redirectvar = <Redirect to="/dashboard" />;
    }

    return (
      <div>
        {redirectvar}
        <br />
        <section class="addjob">
          <div class="container">
            <div class="createtopic">
              <div class="create__head">
                <div class="create__title">
                  <img src={newTopic} alt="New topic" />
                  Add a New Job Opening
                </div>
              </div>
              <div style={{ textAlign: "left", padding: "20px" }}>
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add here"
                      name="title"
                      onChange={this.onChange}
                      value={this.state.title}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Job Description</label>
                    <textarea
                      class="form-control"
                      rows="10"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Job Type</label>
                    <select
                      class="custom-select"
                      name="jobtype"
                      onChange={this.onChange}
                      value={this.state.jobtype}
                      required
                    >
                      <option selected disabled value="">
                        Choose
                      </option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 form-group">
                      <label for="country">Country</label>
                      <select
                        class="custom-select"
                        id="country"
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                        required
                      >
                        <option selected disabled value="">
                          Choose
                        </option>
                        {showCountries}
                      </select>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label for="state">State</label>
                      <select
                        class="custom-select"
                        name="state"
                        value={this.state.state}
                        onChange={this.onChange}
                      >
                        <option selected disabled value="">
                          Choose
                        </option>
                        {showStates}
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 form-group">
                      <label>City</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="City"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div class="col-lg-6 form-group">
                      <label>Zipcode</label>
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
                  <div class="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add here"
                      name="companyname"
                      onChange={this.onChange}
                      value={this.state.companyname}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Company Description</label>
                    <textarea
                      class="form-control"
                      rows="10"
                      placeholder="A bried description about the company"
                      name="companydescription"
                      value={this.state.companydescription}
                      onChange={this.onChange}
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Application URL</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Specify application url if any"
                      name="applicationurl"
                      onChange={this.onChange}
                      value={this.state.applicationurl}
                    />
                  </div>
                  <br />
                  <div class="create__footer">
                    <button
                      type="button"
                      class="create__btn-cancel btn"
                      onClick={this.onClick}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="create__btn-create btn btn--type-02"
                    >
                      Save and publish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    errors: state.auth.errors,
    newjobposted: state.jobs.newjobposted,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStatetoProps, { addopening, setError })(AddJobs);
