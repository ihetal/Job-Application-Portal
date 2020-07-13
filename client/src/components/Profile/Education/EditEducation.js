import React, { Component } from "react";
import "./AddEducation.css";
import axios from "axios";
export class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      institution: "",
      degree: "",
      major: "",
      grade: "",
      startyear: "",
      endyear: "",
      activities: "",
      description: "",
    };
  }
  componentDidMount() {
    this.setState({
      _id: this.props.details._id,
      institution: this.props.details.institution,
      degree: this.props.details.degree,
      major: this.props.details.major,
      grade: this.props.details.grade,
      startyear: this.props.details.startyear,
      endyear: this.props.details.endyear,
      activities: this.props.details.activities,
      description: this.props.details.description,
    });
    console.log(this.props.details);
  }
  showAddEducation = () => {
    let form = document.getElementById("editedu");
    let bg = document.getElementById("backgrounddiv");
    form.classList.add("show");
    bg.classList.add("disableDiv");
  };
  closeAddEducation = () => {
    let form = document.getElementById("editedu");
    form.classList.remove("show");
    let bg = document.getElementById("backgrounddiv");
    bg.classList.remove("disableDiv");
    this.setState({
      _id: "",
      institution: "",
      degree: "",
      major: "",
      grade: "",
      startyear: "",
      endyear: "",
      activities: "",
      description: "",
    });
    this.props.closeEdit();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/userEducation", this.state)
      .then((response) => {
        if (response.status === 200) {
          this.props.editDetails(this.state);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.responseMsg);
        }
      });
  };
  render() {
    return (
      <div id="backgrounddiv" className="disableDiv">
        <div className="addeducation col show" id="editedu">
          <div className="row">
            <h2 className="col mb-3">Edit Education</h2>
            <i
              className="fas fa-times fa-2x col-md-1"
              onClick={this.closeAddEducation}
            ></i>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="form-row pt-2">
              <div className="col input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-university"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Institution"
                  name="institution"
                  value={this.state.institution}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-graduation-cap"></i>
                  </span>
                </div>
                <select
                  className="custom-select"
                  name="degree"
                  onChange={this.onChange}
                  required
                >
                  <option selected disabled value={this.state.degree}>
                    {this.state.degree}
                  </option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="Doctoral">Doctoral</option>
                  <option value="Associate's">Associate's</option>
                  <option value="High School, Dipoloma or Equivalent">
                    High School, Dipoloma or Equivalent
                  </option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="col input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-book-open"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Field of study"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grade"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-calendar-plus"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start Year"
                  name="startyear"
                  value={this.state.startyear}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-calendar-plus"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="End Year (or expected)"
                  name="endyear"
                  value={this.state.endyear}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col mb-3">
                <textarea
                  className="form-control"
                  rows="7"
                  placeholder="Activities and Societies"
                  name="activities"
                  value={this.state.activities}
                  onChange={this.onChange}
                ></textarea>
              </div>
            </div>
            <div className="form-row">
              <div className="col mb-3">
                <textarea
                  className="form-control"
                  rows="7"
                  name="description"
                  value={this.state.description}
                  placeholder="Description"
                  onChange={this.onChange}
                ></textarea>
              </div>
            </div>
            <button
              style={{ backgroundColor: "green" }}
              className="btn btn-success mr-2"
              type="submit"
            >
              <i className="fas fa-thumbs-up pr-2"></i>
              Save{"   "}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.closeAddEducation}
            >
              <i className="fas fa-ban pr-2"></i>Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditEducation;
