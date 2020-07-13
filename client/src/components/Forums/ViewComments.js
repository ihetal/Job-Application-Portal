import React, { Component } from "react";
import avatar from "./img/avatar.png";
export class ViewComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mydate: "",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  }
  componentDidMount() {
    let date = new Date(this.props.comment.created_at);
    setTimeout(() => {
      this.setState({
        mydate:
          date.getDate() +
          " " +
          this.state.monthNames[date.getMonth()] +
          "," +
          date.getFullYear(),
      });
    }, 200);
  }

  render() {
    return (
      <div class="container">
        <div class="topic__description">
          <div class="description">
            <div class="topic__avatar">
              {this.props.comment.profilepicture ? (
                <img
                  src={`https://divyang-files.s3.us-west-1.amazonaws.com/${this.props.comment.profilepicture}`}
                  class="usericon"
                  alt="avatar"
                />
              ) : (
                <img src={avatar} class="usericon" alt="avatar" />
              )}
            </div>
            <div class="topic__caption">
              <div class="topic__user">
                {this.props.comment.firstname} {this.props.comment.lastname}
              </div>

              <div class="topic__date">
                <i class="fas fa-history"></i>
                {"  "}
                {this.state.mydate}
              </div>
            </div>
          </div>
          <div class="topic__comments">
            <p>{this.props.comment.comment}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewComments;
