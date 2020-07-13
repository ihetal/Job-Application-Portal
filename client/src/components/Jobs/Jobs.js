import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchPopularJobs,
  searchJobs,
  setJobLoading,
} from "../../actions/jobActions";
import Header from "../Header.js";
import FeaturedJobs from "./FeaturedJobs";
import PopularJobs from "./PopularJobs";
import "./Jobs.css";

export class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSearched: false,
      title: "",
      city: "",
      state: "",
    };
  }
  componentDidMount() {
    this.setState({
      hasSearched: false,
      title: "",
      city: "",
      state: "",
    });
    this.props.fetchPopularJobs();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.setJobLoading();
    this.props.searchJobs(this.state);
    setTimeout(() => {
      this.setState({ hasSearched: true });
    }, 1000);
  };
  render() {
    if (this.state.hasSearched) {
      return <Redirect to="/jobsearch" />;
    }
    return (
      <div>
        <Header />
        <div>
          <section class="job-form-section job-form-section--image">
            <div class="container">
              <div class="row">
                <div class="mx-auto">
                  <div class="job-form-box">
                    <h2 class="heading h2">
                      Find a <span class="accent">job</span> you will{"  "}
                      <span class="accent">love</span>
                    </h2>
                    <form onSubmit={this.onSubmit}>
                      <div
                        class="form-row"
                        style={{ display: "flex", flexWrap: "nowrap" }}
                      >
                        <div class="form-group col-md-4">
                          <input
                            type="text"
                            class="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            placeholder="Position you are looking for"
                          />
                        </div>

                        <div class="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control"
                            name="city"
                            value={this.state.city}
                            onChange={this.onChange}
                            placeholder="City"
                          />
                        </div>
                        <div class="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control"
                            name="state"
                            value={this.state.state}
                            onChange={this.onChange}
                            placeholder="State"
                          />
                        </div>
                        <div class="col-md-2">
                          <button
                            type="submit"
                            class="btn btn-outline-white-primary"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-light-gray">
            <div class="container">
              <h3 class="heading h3">Featured jobs</h3>
              <div class="row featured align-items-stretch">
                {this.props.featuredjobs.map((job) => {
                  return <FeaturedJobs job={job} />;
                })}
              </div>
            </div>
          </section>
          <section style={{ background: "white" }}>
            <div class="container">
              <h4 class="heading h4">Trending this month</h4>
              {this.props.featuredjobs.map((job) => {
                return <PopularJobs job={job} />;
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    featuredjobs: state.jobs.jobopenings,
  };
};
export default connect(mapStatetoProps, {
  fetchPopularJobs,
  searchJobs,
  setJobLoading,
})(Jobs);
