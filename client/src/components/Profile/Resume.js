import React, { Component } from "react";
import axios from "axios";
export class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      filename: "Choose File",
      resumefile: true,
      errorMessage: null,
      test: "https://divyang-files.s3-us-west-1.amazonaws.com/resume.pdf",
    };
  }
  onChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.file);
    const formData = new FormData();
    formData.append("resume", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:5000/uploadresume", formData, config)
      .then((response) => {
        console.log("Success");
        this.setState({
          test:
            "https://divyang-files.s3-us-west-1.amazonaws.com/" +
            response.data.file,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.responseMsg,
        });
      });
  };
  onChange(e) {}
  render() {
    return (
      <div>
        <h1>Resume</h1>
        <div class="container">
          <form onSubmit={this.onFormSubmit}>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile02"
                  name="resume"
                  onChange={this.onChange}
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile02"
                  aria-describedby="inputGroupFileAddon02"
                >
                  {this.state.filename}
                </label>
              </div>
              <div class="input-group-append">
                <button
                  type="submit"
                  style={{ height: "38px" }}
                  class="input-group-text"
                  id="inputGroupFileAddon02"
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>

        <div style={{ width: "75%", height: "100vh" }}>
          <iframe
            src="https://divyang-files.s3-us-west-1.amazonaws.com/9c22095b-eed4-43d4-a1cb-abf6a8cf2a6f1592110171974.docx"
            title="Resume"
            style={{ width: "75%", height: "100vh" }}
          ></iframe>
        </div>
        {/* {this.state.resumefile ? (
          <object
            data={this.state.test}
            // data={`https://divyang-files.s3-us-west-1.amazonaws.com/${this.state.resumefile}`}
            type="application/pdf"
            style={{ width: "75%", height: "100vh" }}
          >
            Resume
          </object>
        ) : null} */}
        {/* <object
          data="https://divyang-files.s3-us-west-1.amazonaws.com/resume.pdf"
          type="application/pdf"
          style={{ width: "75%", height: "100vh" }}
        >
          Resume
        </object> */}
      </div>
    );
  }
}

export default Resume;
