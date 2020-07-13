import React, { Component } from "react";
import { Link } from "react-router-dom";
import companylogo from "./company-1.png";
export class PopularJobs extends Component {
  render() {
    return (
      <div class="job-listing  job-listing--last">
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-2">
                <img src={companylogo} alt="ShareBoardd " class="img-fluid" />
              </div>
              <div class="col-10">
                <h4 class="job__title h4">
                  <Link to={{ pathname: "/jobopening", job: this.props.job }}>
                    {this.props.job.title}
                  </Link>
                </h4>
                <p class="job__company">{this.props.job.jobtype}</p>
              </div>
            </div>
          </div>
          <div class="col-10 col-md-3 col-lg-2 ml-auto">
            <i class="fa fa-map-marker job__location"></i>
            {this.props.job.city},{this.props.job.state}
          </div>
          <div class="col-sm-12 col-md-2 col-lg-1">
            <div class="job__star">
              <Link
                to="/"
                data-toggle="tooltip"
                data-placement="top"
                title="Save to favourites"
                class="job__star__link"
              >
                <i class="fa fa-star"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularJobs;
