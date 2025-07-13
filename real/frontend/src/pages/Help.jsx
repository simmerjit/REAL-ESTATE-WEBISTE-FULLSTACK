import React, { useState } from 'react';
import SplineViewer from "../components/Spline.jsx";
import '../styles/help.css';

const Help = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Message sent! Our agents will contact you soon via email.");
      setForm({ name: '', email: '', location: '', message: '' });
    } else {
      alert("❌ Failed to send message: " + data.error);
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <div className="help-page">
      <SplineViewer />

      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <p className="subheading">We’re here to help — ask anything!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Your Location"
            value={form.location}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Help;
