import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../../Header.js";
import logo from "../company-1.png";
import JobsFound from "./JobsFound.js";
import "./JobSearch.css";
import RecommendedJobs from "./RecommendedJobs.js";
import Spinner from "react-bootstrap/Spinner";
import {
  searchJobs,
  getAppBasedRecommendations,
  getPaginatedJobs,
  setJobLoading,
} from "../../../actions/jobActions";
export class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      city: "",
      state: "",
      country: "",
      page: 1,
      limit: 10,
      loading: false,
    };
  }
  componentDidMount() {
    this.props.getAppBasedRecommendations();
  }
  prevPage = () => {
    if (this.state.page > 1) {
      this.props.setJobLoading();
      let data = {
        title: this.state.title,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        page: this.state.page - 1,
      };
      this.props.getPaginatedJobs(data);
      setTimeout(() => {
        this.setState({
          page: this.state.page - 1,
        });
      }, 600);
    }
  };
  nextPage = () => {
    if (this.state.page < Math.ceil(this.props.totalpages / this.state.limit)) {
      this.props.setJobLoading();
      let data = {
        title: this.state.title,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        page: this.state.page + 1,
      };
      this.props.getPaginatedJobs(data);
      setTimeout(() => {
        this.setState({
          page: this.state.page + 1,
        });
      }, 600);
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.setJobLoading();
    this.props.searchJobs(this.state);
    this.setState({
      page: 1,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };

  render() {
    let totalpages = Math.ceil(this.props.totalpages / this.state.limit);
    return (
      <div>
        <Header />
        <div class="jobsearch-banner">
          <div class="container">
            <div class="row">
              <div
                class="mx-auto"
                style={{
                  margin: "40px auto",
                  background: " rgba(255, 255, 255, 0.8)",
                  padding: "20px",
                }}
              >
                <h2 class="heading h2">
                  Find a <span class="accent">job</span> you will{"  "}
                  <span class="accent">love</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="headernav" style={{ padding: "0px" }}>
          <div class="container-fluid">
            <div class="searchbar">
              <div class="logo">
                <Link to="/">
                  <img src={logo} alt="" class="img-fluid" />
                </Link>
              </div>
              <div class="search-form">
                <form onSubmit={this.onSubmit}>
                  <div
                    class="form-row"
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <div class="form-group col-md-3 search">
                      <input
                        type="text"
                        class="form-control"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        placeholder="Position you are looking for"
                      />
                    </div>

                    <div class="form-group col-md-3 search">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="City"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group col-md-3 search">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="State"
                        name="state"
                        value={this.state.state}
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group col-md-3 search">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Country"
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="col-md-1 search">
                      <button
                        class="btn btn-default"
                        type="button"
                        onClick={this.onSubmit}
                        disabled={this.props.loading}
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
        <br />
        {this.props.loading && <Spinner animation="border" />}
        <div class="container">
          <div class="pagination">
            <p>
              Showing Page {this.state.page} of {totalpages}{" "}
            </p>
            <h4 onClick={this.prevPage}>&laquo;</h4>
            <h4 onClick={this.nextPage}>&raquo;</h4>
          </div>
        </div>
        <section class="content">
          <div class="container" style={{ display: "flex" }}>
            <div class="col-lg-9 col-md-9">
              {this.props.jobs.map((job) => {
                return <JobsFound job={job} />;
              })}
            </div>
            <div class="col-lg-5 col-md-5">
              <div class="sidebarblock">
                <h4 class="heading h4">Recommended for you</h4>
                <div class="divline"></div>
                <div class="blocktxt">
                  {this.props.application_based_recommendations.length === 0 ? (
                    <p> Sorry no similiar jobs found</p>
                  ) : (
                    <ul>
                      {this.props.application_based_recommendations.map(
                        (job) => {
                          return <RecommendedJobs job={job} />;
                        }
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.searchresults,
    application_based_recommendations:
      state.jobs.application_based_recommendations,
    totalpages: state.jobs.totalpages,
    loading: state.jobs.loading,
  };
};
export default connect(mapStateToProps, {
  searchJobs,
  getAppBasedRecommendations,
  getPaginatedJobs,
  setJobLoading,
})(withRouter(JobSearch));
