import React, { useState, useEffect } from "react";
import "./ClientMeeting.css";
import {
  getClientMeetings,
  addClientMeeting,
  updateClientMeeting,
  deleteClientMeeting,
} from "../api/clientmeeting";

const ClientMeeting = () => {
  const [meetings, setMeetings] = useState([]);
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

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const { data } = await getClientMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {
    const formattedData = {
      ...formData,
      date: formData.date.split("T")[0], // ensure only YYYY-MM-DD
    };

    if (editingMeeting) {
      await updateClientMeeting(editingMeeting.meeting_id, formattedData);
    } else {
      await addClientMeeting(formattedData);
    }
    fetchMeetings();
    resetForm();
  } catch (error) {
    console.error("Error saving meeting:", error);
  }
};


  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setFormData(meeting);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        await deleteClientMeeting(id);
        fetchMeetings();
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      client: "",
      purpose: "",
      date: "",
      time: "",
      status: "Scheduled",
      notes: "",
    });
    setFormVisible(false);
    setEditingMeeting(null);
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
          <div className="clientmeeting-card" key={m.meeting_id}>
            <div className="clientmeeting-header-top">
              <h3>{m.client}</h3>
              <span className={`status ${m.status.toLowerCase()}`}>
                {m.status}
              </span>
            </div>
            <div className="clientmeeting-details">
              <p>Date: {m.date}</p>
              <p>Time: {m.time}</p>
              <p>Purpose: {m.purpose}</p>
              <p className="notes">Notes: {m.notes}</p>
            </div>
            <div className="clientmeeting-actions">
              <button className="edit-btn" onClick={() => handleEdit(m)}>
                Edit
              </button>
              <button
                className="complete-btn"
                onClick={() => handleDelete(m.meeting_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              <button className="cancel-btn" onClick={resetForm}>
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
