import React, { useState } from "react";
import "../styles/Contact.css";
import service1Img from "../assets/service1.png";
const Contact = () => {
  const [state, setState] = useState({
    fname: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.fname || !state.email || !state.message) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(JSON.stringify(state, null, 2));

    setSubmitted(true);
    setState({
      fname: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="contact">
      <section className="contact-section">
        <div className="contact-left">
          <img
            src={service1Img}
            alt="Dr. Online contact illustration"
            className="contact-img"
          />

          <h1>
            Contact <span className="brand">Dr. Online</span>
          </h1>
          <p>
            Have questions, ideas, or feedback? Our team is happy to hear from
            you.
          </p>

          <ul className="contact-info">
            <li>
              <b>Email:</b> support@dronline.com
            </li>
            <li>
              <b>Phone:</b> +961 70 000 000
            </li>
            <li>
              <b>Response Time:</b> within 24 hours
            </li>
          </ul>
        </div>

        <div className="contact-right">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name *</label>
            <input
              name="fname"
              placeholder="Enter full name..."
              type="text"
              value={state.fname}
              onChange={handleChange}
            />

            <label>Email *</label>
            <input
              name="email"
              placeholder="Enter email..."
              type="email"
              value={state.email}
              onChange={handleChange}
            />

            <label>Subject</label>
            <select
              name="subject"
              value={state.subject}
              onChange={handleChange}
            >
              <option>General Inquiry</option>
              <option>Technical Issue</option>
              <option>Medical Question</option>
              <option>Partnership Request</option>
              <option>Other</option>
            </select>

            <label>Message *</label>
            <textarea
              rows="6"
              placeholder="Enter message..."
              name="message"
              value={state.message}
              onChange={handleChange}
            />

            <button type="submit" className="send-btn">
              Send Message
            </button>

            {submitted ? (
              <p className="success-msg">✅ Message sent successfully!</p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
