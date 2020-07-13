import React, { Component } from "react";
import "./style.css";
export class ContactForm extends Component {
  state = {
    onSubmitMessage: "",
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ onSubmitMessage: "Your message has been sent!" });
    localStorage.setItem("userName", "Hetal");
  };
  render() {
    return (
      <div id="form">
        <h4>Send us a message</h4>
        <form onSubmit={this.onSubmit} className="contactForm">
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="username"
              aria-describedby="emailHelp"
              placeholder="Your Email Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="subject"
              id="subject"
              placeholder="Subject"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="message"
              rows="5"
              data-msg="Please write something for us"
              placeholder="Message"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <div className="error-message"></div>
            <div className="sent-message">{this.state.onSubmitMessage}</div>
          </div>

          <div className="text-center">
            <button type="submit" title="Send Message">
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
