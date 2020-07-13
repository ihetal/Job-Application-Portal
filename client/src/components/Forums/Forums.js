import React, { Component } from "react";
import { fetchPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import pinned from "./img/Pinned.svg";
import ForumsHeader from "./ForumsHeader";
import Post from "./Post";
import "./Forums.css";
export class Forums extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div>
        <ForumsHeader />
        <br />
        <section>
          <div
            class="table-responsive container "
            style={{ background: "white", padding: "0px" }}
          >
            <table class="table table-hover">
              <thead class="thead-dark">
                <tr class="text-left">
                  <th style={{ width: "65%" }}>Topic</th>
                  <th>Category</th>
                  <th>Replies</th>
                  <th>Last Update at</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#fef2e0" }}>
                  <td class="text-left posts__content">
                    <div class="posts__content">
                      <h4>
                        <img src={pinned} alt="pinned" />
                        Welcome New Users! Please read this before posting!
                      </h4>

                      <br />
                      <p>
                        {" "}
                        Congratulations, you have found the Community! Before
                        you make a new topic or post, please read community
                        guidelines.
                      </p>
                    </div>
                  </td>
                  <td class="align-middle"></td>
                  <td class="align-middle"></td>
                  <td class="align-middle"></td>
                </tr>
                {this.props.posts.map((post) => {
                  return <Post key={post._id} post={post} />;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};
export default connect(mapStateToProps, { fetchPosts })(Forums);
