import React, { useState } from "react";
import "./Billing.css";
import { FaSearch, FaCalendarAlt, FaUser, FaDollarSign } from "react-icons/fa";

const Billing = () => {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-2024-001",
      customer: "Mrs. Priya Sharma",
      items: "Diamond Ring, Gold Chain",
      amount: "₹125,000",
      date: "2024-01-15",
      status: "Paid",
    },
    {
      id: "INV-2024-002",
      customer: "Mr. Rajesh Kumar",
      items: "Emerald Necklace",
      amount: "₹85,000",
      date: "2024-01-14",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [viewInvoice, setViewInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    items: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  // ✅ Print Invoice
  const handlePrint = (invoice) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #333; }
            p { margin: 5px 0; }
            strong { color: #555; }
          </style>
        </head>
        <body>
          <h2>Invoice: ${invoice.id}</h2>
          <p><strong>Customer:</strong> ${invoice.customer}</p>
          <p><strong>Items:</strong> ${invoice.items}</p>
          <p><strong>Amount:</strong> ${invoice.amount}</p>
          <p><strong>Date:</strong> ${invoice.date}</p>
          <p><strong>Status:</strong> ${invoice.status}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ✅ Save Edited Invoice
  const handleSaveEdit = () => {
    const updated = invoices.map((inv) =>
      inv.id === editingInvoice.id ? editingInvoice : inv
    );
    setInvoices(updated);
    setEditingInvoice(null);
    alert("Invoice updated successfully!");
  };

  // ✅ Save New Invoice
  const handleSaveNew = () => {
    const newInv = {
      ...newInvoice,
      id: `INV-2024-00${invoices.length + 1}`,
    };
    setInvoices([newInv, ...invoices]);
    setCreatingInvoice(false);
    setNewInvoice({
      customer: "",
      items: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    });
    alert("Invoice created successfully!");
  };

  // ✅ Filter invoices
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.items.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="billing-container">
      <div className="billing-header">
        <div>
          <h2>Billing & Invoices</h2>
          <p>Manage customer invoices and payments</p>
        </div>
        <button className="create-btn" onClick={() => setCreatingInvoice(true)}>
          + Create Invoice
        </button>
      </div>

      {/* Search Bar */}
      <div className="billing-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Invoice List */}
      <div className="invoice-list">
        {filteredInvoices.map((inv) => (
          <div key={inv.id} className="invoice-card">
            <div className="invoice-top">
              <span className="invoice-id">{inv.id}</span>
              <span
                className={`status ${inv.status === "Paid" ? "paid" : "pending"}`}
              >
                {inv.status}
              </span>
            </div>

            <div className="invoice-details">
              <p>
                <FaUser className="icon" /> <strong>Customer:</strong> {inv.customer}
              </p>
              <p>
                <FaDollarSign className="icon" /> <strong>Amount:</strong> {inv.amount}
              </p>
              <p>
                <FaCalendarAlt className="icon" /> <strong>Date:</strong> {inv.date}
              </p>
              <p>
                <strong>Items:</strong> {inv.items}
              </p>
            </div>

            <div className="invoice-actions">
              <button className="view-btn" onClick={() => setViewInvoice(inv)}>
                View
              </button>
              <button className="print-btn" onClick={() => handlePrint(inv)}>
                Print
              </button>
              <button className="edit-btn" onClick={() => setEditingInvoice(inv)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewInvoice && (
        <div className="modal">
          <div className="modal-content">
            <h3>Invoice Details</h3>
            <p><strong>ID:</strong> {viewInvoice.id}</p>
            <p><strong>Customer:</strong> {viewInvoice.customer}</p>
            <p><strong>Items:</strong> {viewInvoice.items}</p>
            <p><strong>Amount:</strong> {viewInvoice.amount}</p>
            <p><strong>Date:</strong> {viewInvoice.date}</p>
            <p><strong>Status:</strong> {viewInvoice.status}</p>
            <button onClick={() => setViewInvoice(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingInvoice && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Invoice - {editingInvoice.id}</h3>
            <input
              type="text"
              value={editingInvoice.customer}
              onChange={(e) =>
                setEditingInvoice({ ...editingInvoice, customer: e.target.value })
              }
              placeholder="Customer"
            />
            <input
              type="text"
              value={editingInvoice.items}
              onChange={(e) =>
                setEditingInvoice({ ...editingInvoice, items: e.target.value })
              }
              placeholder="Items"
            />
            <input
              type="text"
              value={editingInvoice.amount}
              onChange={(e) =>
                setEditingInvoice({ ...editingInvoice, amount: e.target.value })
              }
              placeholder="Amount"
            />
            <input
              type="date"
              value={editingInvoice.date}
              onChange={(e) =>
                setEditingInvoice({ ...editingInvoice, date: e.target.value })
              }
            />
            <select
              value={editingInvoice.status}
              onChange={(e) =>
                setEditingInvoice({ ...editingInvoice, status: e.target.value })
              }
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingInvoice(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {creatingInvoice && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Invoice</h3>
            <input
              type="text"
              value={newInvoice.customer}
              onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
              placeholder="Customer"
            />
            <input
              type="text"
              value={newInvoice.items}
              onChange={(e) => setNewInvoice({ ...newInvoice, items: e.target.value })}
              placeholder="Items"
            />
            <input
              type="text"
              value={newInvoice.amount}
              onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
              placeholder="Amount"
            />
            <input
              type="date"
              value={newInvoice.date}
              onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
            />
            <select
              value={newInvoice.status}
              onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleSaveNew}>Create</button>
              <button onClick={() => setCreatingInvoice(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;


