import React, { useState } from "react";
import "./ClientMeeting.css";
import calendarIcon from "../assets/calendar.png";
import clockIcon from "../assets/clock.png";

const ClientMeeting = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      client: "Mrs. Priya Sharma",
      purpose: "Ring Selection",
      date: "2025-09-10",
      time: "2:00 PM",
      status: "Scheduled",
      notes: "Discuss diamond options",
    },
    {
      id: 2,
      client: "Mr. John Doe",
      purpose: "Workshop Visit",
      date: "2025-09-11",
      time: "11:00 AM",
      status: "Confirmed",
      notes: "Inspect gold chain polishing",
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formData, setFormData] = useState({
    client: "",
    purpose: "",
    date: "",
    time: "",
    status: "Scheduled",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingMeeting) {
      setMeetings(
        meetings.map((m) =>
          m.id === editingMeeting.id ? { ...m, ...formData } : m
        )
      );
    } else {
      setMeetings([...meetings, { ...formData, id: Date.now() }]);
    }
    setFormVisible(false);
    setEditingMeeting(null);
    setFormData({
      client: "",
      purpose: "",
      date: "",
      time: "",
      status: "Scheduled",
      notes: "",
    });
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setFormData(meeting);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      setMeetings(meetings.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="clientmeeting-container">
      <div className="clientmeeting-header">
        <div>
          <h2>Client Meetings</h2>
          <p>View and manage all client meetings</p>
        </div>
        <button className="schedule-btn" onClick={() => setFormVisible(true)}>
          Add Meeting
        </button>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search meetings..." />
      </div>

      <div className="clientmeeting-list">
        {meetings.map((m) => (
          <div className="clientmeeting-card" key={m.id}>
            <div className="clientmeeting-header-top">
              <h3>{m.client}</h3>
              <span className={`status ${m.status.toLowerCase()}`}>
                {m.status}
              </span>
            </div>
            <div className="clientmeeting-details">
              <p>
                <img src={calendarIcon} alt="Date" className="icon-img" />
                {m.date}
              </p>
              <p>
                <img src={clockIcon} alt="Time" className="icon-img" />
                {m.time}
              </p>
              <p>Purpose: {m.purpose}</p>
              <p className="notes">Notes: {m.notes}</p>
            </div>
            <div className="clientmeeting-actions">
              <button className="edit-btn" onClick={() => handleEdit(m)}>
                Edit
              </button>
              <button
                className="complete-btn"
                onClick={() => handleDelete(m.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {formVisible && (
        <div className="modal-overlay" onClick={() => setFormVisible(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{editingMeeting ? "Edit Meeting" : "Add New Meeting"}</h3>
            <input
              type="text"
              name="client"
              placeholder="Client Name"
              value={formData.client}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="purpose"
              placeholder="Purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            />
            <div className="form-actions">
              <button className="submit-btn" onClick={handleSave}>
                {editingMeeting ? "Update" : "Save"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setFormVisible(false);
                  setEditingMeeting(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientMeeting;

