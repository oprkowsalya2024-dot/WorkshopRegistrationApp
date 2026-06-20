import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workshop: "",
  });

  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = participants.some(
      (participant) => participant.email === formData.email
    );

    if (exists) {
      setMessage("⚠ Participant already registered!");
      return;
    }

    setParticipants([
      ...participants,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setMessage("✅ Registration Confirmed Successfully!");

    setFormData({
      name: "",
      email: "",
      workshop: "",
    });
  };

  return (
    <div className="container">

      <div className="header">
        <h1>Workshop Registration Portal</h1>
        <p>Register & Confirm Your Participation</p>
      </div>

      <div className="stats-card">
        <h2>{participants.length}</h2>
        <p>Total Participants</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="workshop"
          value={formData.workshop}
          onChange={handleChange}
          required
        >
          <option value="">Select Workshop</option>
          <option>React JS</option>
          <option>Python</option>
          <option>UI/UX Design</option>
          <option>Data Science</option>
        </select>

        <button type="submit">
          Register Now
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      <div className="table-card">
        <h2>Registered Participants</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Workshop</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{participant.workshop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;