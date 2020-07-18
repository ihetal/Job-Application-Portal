import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import "./Header.css";
export class Header extends Component {
  constructor(props) {
    super(props);
    this.navBar = React.createRef();
  }

  render() {
    let linkvalue = "/profile";
    if (this.props.isemployer) {
      linkvalue = "/employerprofile";
    }
    return (
      <div>
        <nav
          style={{ zIndex: "100" }}
          ref={this.navBar}
          class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top"
        >
          <button type="button" class="mobile-nav-toggle d-xl-none">
            <i class="fa fa-bars"></i>
          </button>
          <Link to="/" class="navbar-brand">
            DIVYANG
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link to="/" class="nav-link">
                  Home <span class="sr-only"></span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/jobs">
                  Job Portal
                </Link>
              </li>
              <li class="nav-item">
                {this.props.isemployer ? (
                  <Link class="nav-link" to="/dashboard">
                    Applications
                  </Link>
                ) : (
                  <Link class="nav-link" to="/forum">
                    Discuss
                  </Link>
                )}
              </li>
            </ul>
            <ul className="navbar-nav">
              {this.props.isAuthenticated ? (
                <div>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hello {localStorage.getItem("userName")}!
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link to={linkvalue} className="dropdown-item">
                        <i
                          style={{
                            display: "inline-block",
                            marginRight: "2px",
                          }}
                          class="fas fa-users"
                        ></i>
                        Profile
                      </Link>
                      <Link
                        to="/"
                        onClick={() => {
                          this.props.logout();
                        }}
                        className="dropdown-item"
                      >
                        <i
                          style={{
                            display: "inline-block",
                            marginRight: "2px",
                          }}
                          className="fas fa-sign-out-alt"
                        ></i>
                        Logout
                      </Link>
                    </div>
                  </li>
                </div>
              ) : (
                <React.Fragment>
                  <li class="nav-item">
                    <Link
                      className="nav-link"
                      to={{ pathname: "/login", state: { login: true } }}
                    >
                      <i className="nav-link fas fa-user"></i>Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={{ pathname: "/signup", state: { login: false } }}
                    >
                      <i class=" nav-link fa fa-user-plus"></i>Register
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
        <div id="myheader">
          <nav class="nav-menu">
            <ul>
              <li>
                <Link to="/">
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <i className="fa fa-folder-open" aria-hidden="true"></i> Job
                  Portal
                </Link>
              </li>
              <li>
                {this.props.isemployer ? (
                  <Link to="/dashboard">
                    <i className="fas fa-copy"></i> Applications
                  </Link>
                ) : (
                  <Link to="/forum">
                    <i className="fa fa-comment" aria-hidden="true"></i> Discuss
                  </Link>
                )}
              </li>
              {this.props.isAuthenticated ? (
                <React.Fragment>
                  <li>
                    <Link to={linkvalue}>
                      <i className="fas fa-users"></i>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        this.props.logout();
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    <Link to={{ pathname: "/login", state: { login: true } }}>
                      <i className="fas fa-user"></i>
                      {"  "} Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "/signup", state: { login: false } }}>
                      <i className="fa fa-user-plus"></i>Register
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isemployer: state.auth.isemployer,
  };
};
export default connect(mapStateToProps, { logout })(Header);
