import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchposts } from "../../actions/postActions";
import { connect } from "react-redux";
import Header from "../Header.js";
import logo from "./img/Logo_Forum.png";
import newTopic from "./img/newtopic.png";
export class ForumsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.search !== "") this.props.searchposts(this.state);
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <section>
          <div class="forum-banner">
            <div class="container">
              <h1 class="h1">
                <img
                  src={logo}
                  alt="logo"
                  class="img-fluid"
                  style={{ width: "50px", marginRight: "25px" }}
                />
                Community <span class="accent">Forum</span>
              </h1>
            </div>
          </div>
          <div class="headernav">
            <div class="container" style={{ display: "flex" }}>
              <div style={{ flex: "4" }}>
                <form>
                  <div class="form-row searchbar">
                    <div class="form-group search" style={{ flex: "3" }}>
                      <input
                        type="text"
                        class="form-control"
                        name="search"
                        value={this.state.search}
                        onChange={this.onChange}
                        placeholder="Search Topic"
                      />
                    </div>
                    <div class="search" style={{ marginLeft: "10px" }}>
                      <button
                        class="btn btn-default"
                        type="button"
                        onClick={this.onSubmit}
                      >
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="header__offset-btn row">
                <Link to="/addtopic">
                  <img src={newTopic} alt="New Topic" class="img-fluid" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(null, { searchposts })(ForumsHeader);
