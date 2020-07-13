import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { resetAuthorization } from "../../actions/authActions";
import $ from "jquery";
import axios from "axios";
import "./Profile.css";

import Header from "../Header";
import Education from "./Education/Education.js";
import PersonalInfo from "./PersonalInfo/PersonalInformation.js";
import WorkExperience from "./WorkExperience/WorkExperience.js";

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: [<PersonalInfo />, <Education />, <WorkExperience />],
      activeId: 0,
      avatar: "default.png",
      authenticated: true,
    };
  }
  onChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] !== undefined) {
      const formData = new FormData();
      formData.append("profileImage", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("/upload", formData, config)
        .then((response) => {
          this.setState({
            avatar: response.data.file,
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.authenticated !== undefined) {
              this.props.resetAuthorization(err.response.data.responseMsg);
            } else {
              alert(err.response.data.responseMsg);
            }
          }
        });
    }
  };

  componentDidMount() {
    $("li.profileSideBar").click(function () {
      $(".profileSideBar").removeClass("activeSideBar");
      $(this).addClass("activeSideBar");
    });

    axios.get("/profile/personalinfo").then((res) => {
      if (res.data.user.profilepicture !== undefined)
        this.setState({ avatar: res.data.user.profilepicture });
    });
  }
  activeTabChange = (event) => {
    this.setState({ activeId: parseInt(event.currentTarget.dataset.id) });
  };
  render() {
    return (
      <Fragment>
        <Header />
        <div style={{ display: "flex" }}>
          <div style={{ height: "100vh", width: "240px" }}>
            <nav class="menu" tabIndex="0">
              <div class="smartphone-menu-trigger"></div>

              <header class="avatar">
                <div class="image-upload">
                  <img
                    src={`https://divyang-files.s3.us-west-1.amazonaws.com/${this.state.avatar}`}
                    alt="img"
                    onClick={() => {
                      document.getElementById("profilepic").click();
                    }}
                  />
                  <form>
                    <input
                      type="file"
                      name="profileImage"
                      id="profilepic"
                      onChange={this.onChange}
                      style={{ display: "None" }}
                    />
                  </form>
                </div>
                <h2>{localStorage.getItem("userName")}</h2>
              </header>
              <ul>
                <li
                  tabindex="0"
                  className="profileSideBar activeSideBar"
                  data-id="0"
                  onClick={this.activeTabChange}
                >
                  <i className="fas fa-user"></i>
                  <span>Personal Information</span>
                </li>
                <li
                  tabindex="0"
                  className="profileSideBar"
                  data-id="1"
                  onClick={this.activeTabChange}
                >
                  <i className="fas fa-user-graduate"></i>
                  <span>Educational History</span>
                </li>
                <li
                  tabindex="0"
                  className="profileSideBar"
                  data-id="2"
                  onClick={this.activeTabChange}
                >
                  <i className="fas fa-history"></i>
                  <span>Work Experience</span>
                </li>
                <li
                  tabindex="0"
                  class="profileSideBar"
                  data-id="3"
                  onClick={this.activeTabChange}
                >
                  <i className="fas fa-file"></i>
                  <span>Resume</span>
                </li>
              </ul>
            </nav>
          </div>
          <div
            style={{
              width: "100%",
              overflow: "visible",
              background: "#fff",
              backgroundColor: "#d9d9d9",
              backgroundImage:
                "linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%)",
            }}
          >
            {this.state.activeTab[this.state.activeId]}
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStatetoProps, { resetAuthorization })(SideBar);
