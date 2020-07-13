import React, { Component } from "react";
import { postreply } from "../../actions/postActions";
import { connect } from "react-redux";
import ForumsHeader from "./ForumsHeader";
import avatar from "./img/avatar.png";
import reply from "./img/reply.png";
import ViewComments from "./ViewComments";
export class ViewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
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
    let date = new Date(this.props.currentpost.createdAt);
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
  myDate = (date) => {
    return date.getFullYear;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentpost !== this.props.currentpost) {
      this.hideReply();
      this.setState({
        comment: "",
      });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  hideReply = () => {
    let post = document.getElementById("reply_post");
    post.classList.add("hidereplypost");
  };
  showReply = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let post = document.getElementById("reply_post");
    post.classList.remove("hidereplypost");
  };
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      postid: this.props.currentpost._id,
      comment: this.state.comment,
    };

    this.props.postreply(data);
  };

  render() {
    if (this.props.errors !== "") {
      alert(this.props.errors);
    }
    let PostComments = "";
    if (
      this.props.currentpost.comments !== undefined &&
      this.props.currentpost.comments.length !== 0
    ) {
      PostComments = (
        <React.Fragment>
          {this.props.currentpost.comments.map((comment) => {
            return <ViewComments comment={comment} />;
          })}
        </React.Fragment>
      );
    }
    return (
      <div>
        <ForumsHeader />
        <div class="container hidereplypost" id="reply_post">
          <div class="topic__description">
            <div class="description">
              <div class="topic__avatar">
                <img src={reply} class="generalicon" alt="avatar" />
              </div>
              <div class="topic__caption">
                <div class="topic__user">Reply to Post</div>
              </div>
            </div>
            <div class="replypost_form">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Description"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.onChange}
                    required
                  ></textarea>
                </div>
                <div style={{ paddingBottom: "25px" }}>
                  <button
                    type="button"
                    class="create__btn-cancel btn"
                    onClick={this.hideReply}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="create__btn-create btn btn--type-02"
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="container topics">
          <div class="topics__heading">
            <h2 class="topics__heading-title">
              {this.props.currentpost.topic}
            </h2>
            <div class="tags">{this.props.currentpost.category}</div>
          </div>
        </div>
        <div class="container">
          <div class="topic__description">
            <div class="description">
              <div class="topic__avatar">
                <img src={avatar} class="usericon" alt="avatar" />
              </div>
              <div class="topic__caption">
                <div class="topic__user">
                  {this.props.currentpost.firstname}{" "}
                  {this.props.currentpost.lastname}
                </div>

                <div class="topic__date">
                  <i class="fas fa-history"></i>
                  {"  "}
                  {this.state.mydate}
                </div>
              </div>
            </div>
            <div class="topic__content">
              <div class="topic__text">
                <p>{this.props.currentpost.description}</p>
                <br />
              </div>
            </div>
            <div class="topic__footer">
              <div class="upvotes">
                <p>
                  <i class="far fa-thumbs-up"></i> 0
                </p>
              </div>
              <div class="downvotes">
                <p>
                  <i class="far fa-thumbs-down"></i> 0
                </p>
              </div>
              <div class="downvotes">
                <p>
                  <i class="far fa-heart"></i> 0
                </p>
              </div>
              <div class="replyicon" onClick={this.showReply}>
                <i class="fas fa-reply-all"></i>
              </div>
            </div>
          </div>
        </div>
        {PostComments}
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    errors: state.auth.errors,
    currentpost: state.posts.currentpost,
  };
};
export default connect(mapStatetoProps, { postreply })(ViewTopic);
