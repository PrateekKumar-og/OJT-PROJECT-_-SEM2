import { useEffect, useState } from "react";
import "./support.css";

function Support() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        issue: ""
    });

    const [tickets, setTickets] = useState([]);
    const [success, setSuccess] = useState(false);

    const fetchTickets = async () => {
        const res = await fetch("http://localhost:5000/api/tickets");
        const data = await res.json();
        setTickets(data);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setSuccess(true);
        setForm({ name: "", email: "", issue: "" });

        fetchTickets();
    };

    const handleResolve = async (id) => {
        await fetch(`http://localhost:5000/api/tickets/${id}`, {
            method: "PUT"
        });

        fetchTickets();
    };

    return (
        <div className="support-container">

            <h1>Support Center</h1>

            {success && (
                <div className="success-msg">
                    ✅ Ticket submitted successfully!
                </div>
            )}

            {/* CARD FORM */}
            <div className="support-card">
                <form onSubmit={handleSubmit} className="form">

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Issue</label>
                        <textarea
                            name="issue"
                            value={form.issue}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Submit Ticket</button>

                </form>
            </div>

            <h2>Your Tickets</h2>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((t) => (
                        <tr key={t._id}>
                            <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                            <td>{t.name}</td>
                            <td>{t.email}</td>
                            <td>{t.issue}</td>
                            <td className={t.status === "Resolved" ? "resolved" : "open"}>
                                {t.status}
                            </td>
                            <td>
                                {t.status === "Open" && (
                                    <button onClick={() => handleResolve(t._id)}>
                                        Resolve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Support;