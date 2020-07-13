import React, { Component } from "react";
import "./AddExperience.css";
import axios from "axios";
export class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      employmenttype: "",
      company: "",
      startmonth: "",
      startyear: "",
      endmonth: "",
      endyear: "",
      description: "",
      defaultcheckboxstatus: false,
    };
  }
  checkBoxClicked = (e) => {
    this.setState({
      defaultcheckboxstatus: !this.state.defaultcheckboxstatus,
    });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  showAddExperience = () => {
    let form = document.getElementById("addexp");
    let bg = document.getElementById("backgrounddiv");
    form.classList.add("show");
    bg.classList.add("disableDiv");
  };
  closeAddExperience = () => {
    let form = document.getElementById("addexp");
    form.classList.remove("show");
    let bg = document.getElementById("backgrounddiv");
    bg.classList.remove("disableDiv");
    this.setState({
      title: "",
      employmenttype: "",
      company: "",
      startmonth: "",
      startyear: "",
      endmonth: "",
      endyear: "",
      description: "",
      defaultcheckboxstatus: false,
    });
    document.getElementById("defaultCheck1").checked = false;
  };
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/workExperience", this.state)
      .then((response) => {
        if (response.status === 200) {
          this.closeAddExperience();
          this.props.addDetails(response.data.workExperience);
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
      <div id="backgrounddiv">
        <button onClick={this.showAddExperience} className="addExpButton">
          <i className="fas fa-plus"></i>
        </button>

        <div className="addexperience col" id="addexp">
          <div className="row">
            <h2 className="col mb-3">Add Experience</h2>
            <i
              className="fas fa-times fa-2x col-md-1"
              onClick={this.closeAddExperience}
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
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
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
                  name="employmenttype"
                  onChange={this.onChange}
                  value={this.state.employmenttype}
                  required
                >
                  <option defaultValue disabled value="">
                    Employement Type
                  </option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Self-Employed">Self-Employed</option>
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
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div class="form-row" style={{ paddingLeft: "25px" }}>
              <input
                class="form-check-input mb-3"
                type="checkbox"
                onClick={this.checkBoxClicked}
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I currently work here
              </label>
            </div>
            <div className="form-row">
              <div
                style={{
                  textAlign: "left",
                  color: "grey",
                  paddingLeft: "10px",
                }}
              >
                Start Date
                <div className="col input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="far fa-calendar-plus"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Month"
                      name="startmonth"
                      value={this.state.startmonth}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="col input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="far fa-calendar-plus"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Year"
                      name="startyear"
                      value={this.state.startyear}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  color: "grey",
                }}
              >
                End date
                {this.state.defaultcheckboxstatus ? (
                  <p>Present</p>
                ) : (
                  <React.Fragment>
                    <div className="col input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="far fa-calendar-plus"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Month"
                        name="endmonth"
                        value={this.state.endmonth}
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
                        placeholder="Year"
                        name="endyear"
                        value={this.state.endyear}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </React.Fragment>
                )}
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
              onClick={this.closeAddExperience}
            >
              <i className="fas fa-ban pr-2"></i>Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddExperience;
