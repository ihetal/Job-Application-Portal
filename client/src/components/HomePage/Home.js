import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import introbg from "./img/intro-img.svg";
import ContactForm from "./ContactForm.js";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
export class Home extends Component {
  refreshPage = () => {
    this.props.logout();
    window.location.reload(true);
  };
  render() {
    return (
      <div>
        {/* <!--==========================
                  Header
                ============================--> */}
        <header id="header" className="header-inner-pages">
          <div id="topbar">
            <div className="container">
              <div className="social-links">
                <Link to="/">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/">
                  <i className="fas fa-facebook"></i>
                </Link>
                <Link to="/">
                  <i className="fas fa-linkedin"></i>
                </Link>
                <Link to="/">
                  <i className="fas fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="logo float-left">
              <h1 className="text-light">
                <Link className="scrollto">
                  <span>Divyang</span>
                </Link>
              </h1>
            </div>

            <nav className="main-nav float-right d-none d-lg-block">
              <ul>
                <li>
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="jobs">
                    <span>Job Portal</span>
                  </Link>
                </li>
                <li className="nav-item">
                  {this.props.isemployer ? (
                    <Link className="nav-link" to="/dashboard">
                      Applications
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/forum">
                      Discuss
                    </Link>
                  )}
                </li>
                <li>
                  <a href="#footer">Contact Us</a>
                </li>
                {this.props.isAuthenticated ? (
                  <React.Fragment>
                    <li>
                      <Link onClick={this.refreshPage} to="/">
                        Logout
                      </Link>
                    </li>
                    <span
                      style={{
                        position: "relative",
                        left: "50px",
                        top: "5px",
                        fontSize: "18px",
                        color: "black",
                      }}
                    >
                      Hello {localStorage.getItem("userName")}!
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <Link to={{ pathname: "/login", state: { login: true } }}>
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={{ pathname: "/signup", state: { login: false } }}
                      >
                        Register
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </div>
        </header>
        {/* <!--==========================
                  Introduction Section
                ============================--> */}
        <section id="hero" className="clearfix">
          <div className="container d-flex h-100">
            <div className="row justify-content-center align-self-center">
              <div className="col-md-6 intro-info order-md-first order-last">
                <h2>
                  Divyang
                  <br />A community for <br />
                  <span>Job Seekers!</span>
                </h2>
                <div>
                  <Link
                    to={{ pathname: "/login", state: { login: true } }}
                    className="btn-get-started scrollto"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="col-md-6 intro-img order-md-last order-first">
                <img src={introbg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
        {/* <!--==========================
                   Footer Section
                 ============================--> */}
        <footer id="footer" className="section-bg">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="footer-info">
                        <h3>Divyang</h3>
                        <p>
                          Want a job?
                          <br />
                          Want your queries to be solved?
                          <br />
                          Want to grow your network?
                          <br />
                          <b>Then here is: A one stop solution!</b>
                        </p>
                      </div>

                      <div className="footer-newsletter">
                        <h4>Our Motto</h4>
                        <p>
                          Help the job seeking community to grow exponentially.
                        </p>
                        <button className="btn">
                          <Link
                            to={{ pathname: "/login", state: { login: true } }}
                            className="btn-get-started scrollto"
                          >
                            Get Started
                          </Link>
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                          <li className="#">
                            <Link to="/">HOME</Link>
                          </li>
                          <li>
                            <Link to="/jobs">JOB PORTAL</Link>
                          </li>
                          <li>
                            <Link to="/forum">Q&A FORUM</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="footer-links">
                        <h4>Contact Us</h4>
                        <p>
                          1 Washington Sq, <br />
                          San José State University
                          <br />
                          San Jose, California -95112 <br />
                          <strong>Phone:</strong> +1 510 123 4567
                          <br />
                          <strong>Email:</strong>
                          <a href="mailto:hackedin@somaiya.edu">
                            divyang@sjsu.edu
                          </a>
                          <br />
                        </p>
                      </div>

                      <div className="social-links">
                        <Link>
                          <i className="fab fa-twitter"></i>
                        </Link>
                        <Link>
                          <i className="fab fa-facebook"></i>
                        </Link>
                        <Link>
                          <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link>
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </footer>
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

export default connect(mapStateToProps, { logout })(Home);
