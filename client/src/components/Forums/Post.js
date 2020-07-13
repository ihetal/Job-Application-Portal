import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setcurrentpost } from "../../actions/postActions.js";
import topic from "./img/topic.png";
export class Posts extends Component {
  onClick = () => {
    this.props.setcurrentpost(this.props.post);
  };
  render() {
    return (
      <React.Fragment>
        <tr>
          <td class="text-left posts__content">
            <div class="posts__content">
              <Link onClick={this.onClick} to="/viewtopic">
                <h4>
                  <img src={topic} alt="topic" />
                  {this.props.post.topic}
                </h4>
              </Link>
              <br />
              <p>{this.props.post.description}</p>
            </div>
          </td>
          <td class="align-middle">{this.props.post.category}</td>
          <td class="align-middle">{this.props.post.comments.length}</td>
          <td class="align-middle">
            {this.props.post.updatedAt.replace("T", " ").slice(0, -5)}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default connect(null, { setcurrentpost })(Posts);
