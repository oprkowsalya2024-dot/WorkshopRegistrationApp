import React, { useState } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filterSubject, setFilterSubject] = useState("All");

  const addAssignment = () => {
    if (title === "" || subject === "" || dueDate === "") {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status,
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
    setStatus("Pending");
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const filteredAssignments =
    filterSubject === "All"
      ? assignments
      : assignments.filter((item) => item.subject === filterSubject);

  const submittedCount = assignments.filter(
    (a) => a.status === "Submitted",
  ).length;
  const pendingCount = assignments.filter((a) => a.status === "Pending").length;
  const lateCount = assignments.filter((a) => a.status === "Late").length;

  const subjects = ["All", ...new Set(assignments.map((a) => a.subject))];

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Submitted</option>
          <option>Late</option>
        </select>

        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Submitted</h3>
          <p>{submittedCount}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

        <div className="card">
          <h3>Late</h3>
          <p>{lateCount}</p>
        </div>
      </div>

      <div className="filter">
        <label>Filter by Subject:</label>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          {subjects.map((sub, index) => (
            <option key={index}>{sub}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.subject}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>

              <td>
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Submitted</option>
                  <option>Late</option>
                </select>
              </td>
            </tr>
          ))}

          {filteredAssignments.length === 0 && (
            <tr>
              <td colSpan="5">No Assignments Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
