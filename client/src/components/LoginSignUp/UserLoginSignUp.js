import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginSignup.css";
import { signin, register, setError } from "../../actions/authActions";
import { connect } from "react-redux";
export class UserLoginSignUp extends Component {
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
    errorMessage: "",
    isLogin: false,
    toProfile: false,
  };
  componentDidMount() {
    this.props.location.state.login
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errorMessage: this.props.errors,
      });
    }
  }
  componentWillUnmount() {
    this.props.setError("");
  }
  onClick = (event) => {
    event.preventDefault();
    event.target.name === "signIn"
      ? this.container.current.classList.remove("right-panel-active")
      : this.container.current.classList.add("right-panel-active");
    this.setState({ errorMessage: "" });
  };
  signUp = (event) => {
    event.preventDefault();
    if (this.state.newPassword.length < 6) {
      this.setState({
        errorMessage: "Password must be minimum 6 characters long",
      });
    } else {
      let data = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.newEmail,
        password: this.state.newPassword,
      };
      this.props.register(data);
    }
  };

  signIn = (event) => {
    event.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ errorMessage: "Please fill all the fields" });
    } else {
      let data = { email: this.state.email, password: this.state.password };
      this.props.signin(data);
    }
  };

  updateValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let redirectvar = null;
    let message = null;
    if (this.props.isAuthenticated) {
      redirectvar = <Redirect to="/jobs"></Redirect>;
    }
    if (this.props.toProfile) {
      redirectvar = <Redirect to="/profile"></Redirect>;
    }

    return (
      <React.Fragment>
        {redirectvar}
        <div>
          {message}
          <div className="register">
            <div
              class="registercontainer "
              id="registercontainer"
              ref={this.container}
            >
              <div class="form-container sign-up-container">
                <form onSubmit={this.signUp}>
                  <h2>Create Account</h2>
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
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
                  <button>Sign Up</button>
                </form>
              </div>
              <div class="form-container sign-in-container">
                <form onSubmit={this.signIn}>
                  <h1>Sign in</h1>
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.updateValue}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.updateValue}
                  />
                  <Link
                    to={{ pathname: "/employerlogin", state: { login: true } }}
                  >
                    Employer? Click here!
                  </Link>
                  <button>Sign In</button>
                </form>
              </div>
              <div class="overlay-container">
                <div class="overlay">
                  <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
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
export default connect(mapStateToProps, { signin, register, setError })(
  UserLoginSignUp
);
