import React, { useState } from "react";
import "./ClientMeeting.css";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const ClientMeeting = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      client: "Mrs. Priya Sharma",
      status: "Scheduled",
      date: "1/15/2024",
      time: "2:00 PM",
      location: "Main Showroom",
      purpose: "Wedding Ring Selection",
      notes: "Looking for platinum rings with diamonds",
    },
    {
      id: 2,
      client: "Mr. Rajesh Kumar",
      status: "Confirmed",
      date: "1/16/2024",
      time: "11:00 AM",
      location: "Design Studio",
      purpose: "Custom Necklace Design",
      notes: "Traditional design with emeralds",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    time: "",
    location: "",
    purpose: "",
    notes: "",
  });

  // filter by search
  const filteredMeetings = meetings.filter(
    (m) =>
      m.client.toLowerCase().includes(search.toLowerCase()) ||
      m.purpose.toLowerCase().includes(search.toLowerCase())
  );

  // handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit new meeting
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client || !formData.date || !formData.time) {
      alert("Please fill in required fields");
      return;
    }

    const newMeeting = {
      id: Date.now(),
      status: "Scheduled",
      ...formData,
    };

    setMeetings([...meetings, newMeeting]);

    // reset form
    setFormData({
      client: "",
      date: "",
      time: "",
      location: "",
      purpose: "",
      notes: "",
    });
    setShowForm(false);
  };

  return (
    <div className="meetings-container">
      <div className="meetings-header">
        <div>
          <h2>Client Meetings</h2>
          <p>Manage and schedule client appointments</p>
        </div>
        <button className="schedule-btn" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? "Close Form" : "Schedule Meeting"}
        </button>
      </div>

      {showForm && (
        <form className="meeting-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="client"
            placeholder="Client Name *"
            value={formData.client}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Save Meeting</button>
        </form>
      )}

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search meetings by client name or purpose..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="meeting-list">
        {filteredMeetings.map((m) => (
          <div key={m.id} className="meeting-card">
            <div className="meeting-header">
              <h3>{m.client}</h3>
              <span
                className={`status ${
                  m.status === "Scheduled" ? "scheduled" : "confirmed"
                }`}
              >
                {m.status}
              </span>
            </div>

            <div className="meeting-details">
              <p>
                <FaCalendarAlt className="icon" /> {m.date} &nbsp;&nbsp;
                <FaClock className="icon" /> {m.time} &nbsp;&nbsp;
                <FaMapMarkerAlt className="icon" /> {m.location}
              </p>
              <p>
                <strong>Purpose: {m.purpose}</strong>
              </p>
              <p className="notes">{m.notes}</p>
            </div>

            <div className="meeting-actions">
              <button className="edit-btn">Edit</button>
              <button className="complete-btn">Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientMeeting;
