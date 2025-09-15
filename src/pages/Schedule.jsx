import React, { useState, useEffect } from "react";
import "./Employees.css"; // you can reuse your Customers CSS
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employees";

const Schedule = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Mrs. Sharma - Ring Selection", time: "14:00", color: "blue" },
    { id: 2, title: "Workshop - Polishing", time: "10:00", color: "green" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    color: "blue",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...formData } : ev
        )
      );
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = { id: Date.now(), ...formData };
      setEvents([...events, newEvent]);
    }
    setFormData({ title: "", time: "", color: "blue" });
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      time: event.time,
      color: event.color,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div>
          <h1>Schedule</h1>
          <p>View and manage your calendar</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add Event
        </button>
      </div>

      <div className="schedule-body">
        {/* Calendar placeholder */}
        <div className="calendar-view">
          <h3>Calendar View</h3>
          <div className="calendar-placeholder">
            <p>Calendar component will be implemented here</p>
          </div>
        </div>

        {/* Today's Events */}
        <div className="events-view">
          <h3>Today's Events</h3>
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <span className={`dot ${event.color}`}></span>
              <div className="event-info">
                <p className="event-title">{event.title}</p>
                <p className="event-time">{event.time}</p>
              </div>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => handleEdit(event)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Form */}
      {showForm && (
        <form className="event-form" onSubmit={handleSubmit}>
          <h3>{editingEvent ? "Edit Event" : "Add New Event"}</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            placeholder="Event Time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <select name="color" value={formData.color} onChange={handleChange}>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
          </select>
          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingEvent ? "Update" : "Save"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Schedule;
