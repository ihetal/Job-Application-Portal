import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./EmployerLogin.css";
import {
  employerlogin,
  setError,
  isEmployer,
  registeremployer,
} from "../../../actions/authActions";
import { connect } from "react-redux";
export class EmployerLogin extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    companyname: "",
  };
  componentDidMount() {
    this.props.location.state.login
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
  }

  onClick = (event) => {
    event.preventDefault();
    this.props.setError("");
    event.target.name === "signIn"
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
  };
  signUp = (event) => {
    event.preventDefault();
    if (this.state.newPassword.length < 6) {
      this.props.setError("Password must be minimum 6 characters long");
    } else {
      let data = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.newEmail,
        password: this.state.newPassword,
        companyname: this.state.companyname,
      };
      this.props.registeremployer(data);
    }
  };

  signIn = (event) => {
    event.preventDefault();
    let data = { email: this.state.email, password: this.state.password };
    this.props.employerlogin(data);
  };

  updateValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let redirectvar = null;
    if (this.props.isAuthenticated) {
      this.props.setError("");
      this.props.isEmployer(true);
      redirectvar = <Redirect to="/dashboard"></Redirect>;
    }
    if (this.props.toProfile) {
      this.props.setError("");
      this.props.isEmployer(true);
      redirectvar = <Redirect to="/employerprofile"></Redirect>;
    }
    return (
      <React.Fragment>
        {redirectvar}
        <div>
          <div className="register">
            <div
              class="registercontainer "
              id="registercontainer"
              ref={this.container}
            >
              <div class="form-container sign-up-container">
                <form onSubmit={this.signUp}>
                  <h2>Create Account</h2>
                  <div style={{ color: "red" }}>{this.props.errors}</div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.updateValue}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.updateValue}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="companyname"
                    onChange={this.updateValue}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="newEmail"
                    onChange={this.updateValue}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="newPassword"
                    onChange={this.updateValue}
                    required
                  />
                  <button class="employer-button">Sign Up</button>
                </form>
              </div>
              <div class="form-container sign-in-container">
                <form onSubmit={this.signIn}>
                  <h2>Employer Login</h2>
                  <div style={{ color: "red" }}>{this.props.errors}</div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.updateValue}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.updateValue}
                    required
                  />
                  <Link to={{ pathname: "/login", state: { login: true } }}>
                    Job Seeker? Click here!
                  </Link>
                  <button class="employer-button">Sign In</button>
                </form>
              </div>
              <div class="overlay-container">
                <div class="overlay-employer">
                  <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login</p>
                    <button
                      class="ghost"
                      id="signIn"
                      name="signIn"
                      onClick={this.onClick}
                    >
                      Sign In
                    </button>
                  </div>
                  <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      class="ghost"
                      id="signUp"
                      name="signUp"
                      onClick={this.onClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    toProfile: state.auth.toProfile,
    errors: state.auth.errors,
  };
};
export default connect(mapStateToProps, {
  employerlogin,
  setError,
  isEmployer,
  registeremployer,
})(EmployerLogin);
