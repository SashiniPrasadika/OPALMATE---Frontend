import React, { useState, useEffect } from "react";
import "./Employees.css"; // you can create Schedule.css if needed
import {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../api/schedules";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ title: "", time: "", color: "blue" });

  // Fetch schedules on load
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const { data } = await getSchedules();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateSchedule(editingEvent.schedule_id, formData);
      } else {
        await addSchedule(formData);
      }
      fetchSchedules();
      resetForm();
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
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

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", time: "", color: "blue" });
    setShowForm(false);
    setEditingEvent(null);
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
        <div className="events-view">
          <h3>Today's Events</h3>
          {events.length === 0 && <p>No events scheduled</p>}
          {events.map((event) => (
            <div key={event.schedule_id} className="event-card">
              <span className={`dot ${event.color}`}></span>
              <div className="event-info">
                <p className="event-title">{event.title}</p>
                <p className="event-time">{event.time}</p>
              </div>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => handleEdit(event)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(event.schedule_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Schedule;
