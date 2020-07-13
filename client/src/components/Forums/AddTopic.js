import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ForumsHeader from "./ForumsHeader";
import newTopic from "./img/newtopic.png";
import "./Forums.css";
import { addpost } from "../../actions/postActions";
import { connect } from "react-redux";
export class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      category: "",
      description: "",
      newpostadded: false,
      gotohome: false,
      errorMessage: "",
    };
  }

  onClick = () => {
    this.setState({
      gotohome: true,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newpost !== this.props.newpost) {
      this.setState({
        newpostadded: true,
      });
    }
    if (prevProps.errors !== this.props.errors) {
      alert(this.props.errors);
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addpost(this.state);
  };
  render() {
    if (this.state.newpostadded || this.state.gotohome) {
      return <Redirect to="/forum" />;
    }
    return (
      <div>
        <ForumsHeader />
        <br />
        <section>
          <div class="container">
            <div class="createtopic">
              <div class="create__head">
                <div class="create__title">
                  <img src={newTopic} alt="New topic" />
                  Create New Thread
                </div>
                <span>Forum Guidelines</span>
              </div>
              <div style={{ textAlign: "left", padding: "20px" }}>
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label>Thread Topic</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add here"
                      name="topic"
                      onChange={this.onChange}
                      value={this.state.topic}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Category</label>
                    <select
                      class="custom-select"
                      name="category"
                      onChange={this.onChange}
                      value={this.state.category}
                      required
                    >
                      <option selected disabled value="">
                        Choose
                      </option>
                      <option value="Technical">Technical</option>
                      <option value="Jobs">Jobs</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Competitive Programming">
                        Competitive Programming
                      </option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="General">General</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea
                      class="form-control"
                      rows="15"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      required
                    ></textarea>
                  </div>
                  <br />
                  <div class="create__footer">
                    <button
                      type="button"
                      class="create__btn-cancel btn"
                      onClick={this.onClick}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="create__btn-create btn btn--type-02"
                    >
                      Create Thread
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    errors: state.auth.errors,
    posts: state.posts.posts,
    newpost: state.posts.newpost,
  };
};
export default connect(mapStatetoProps, { addpost })(AddTopic);
