import React, { useState } from "react";
import "./App.css";

function StudentDashboard() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🎓 Student Registration</h1>
        <p className="subtitle">Register your course details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Course Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <button type="submit">Register Now</button>
        </form>

        {submitted && (
          <div className="success-card">
            <h2>✅ Registration Successful</h2>
            <p>
              <b>Name:</b> {student.name}
            </p>
            <p>
              <b>Email:</b> {student.email}
            </p>
            <p>
              <b>Course:</b> {student.course}
            </p>
            <p>
              <b>Phone:</b> {student.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
