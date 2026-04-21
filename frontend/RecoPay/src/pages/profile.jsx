import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./profile.css";

function Profile() {
    const { user, login } = useAuth();
    const toast = useToast();

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedUser = { ...user, ...form };
        login(updatedUser); // updates AuthContext + localStorage
        setEditing(false);
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p className="profile-subtitle">Manage your account details</p>

            <div className="profile-card">
                {/* AVATAR */}
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="avatar-info">
                        <h2>{user?.name || "User"}</h2>
                        <p>{user?.email || ""}</p>
                        <span className="profile-badge">
                            {user?.method === "google" ? "Google Account" : "Email Account"}
                        </span>
                    </div>
                </div>

                <div className="profile-divider" />

                {/* FIELDS */}
                <div className="profile-fields">
                    <div className="profile-field">
                        <label>Full Name</label>
                        {editing ? (
                            <input name="name" value={form.name} onChange={handleChange} />
                        ) : (
                            <p>{user?.name}</p>
                        )}
                    </div>

                    <div className="profile-field">
                        <label>Email</label>
                        {editing ? (
                            <input name="email" type="email" value={form.email} onChange={handleChange} />
                        ) : (
                            <p>{user?.email}</p>
                        )}
                    </div>

                    <div className="profile-field">
                        <label>Phone <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "12px" }}>(Optional)</span></label>
                        {editing ? (
                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
                        ) : (
                            <p>{user?.phone || "Not set"}</p>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    {editing ? (
                        <>
                            <button className="profile-save-btn" onClick={handleSave}>Save Changes</button>
                            <button className="profile-cancel-btn" onClick={() => { setEditing(false); setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" }); }}>Cancel</button>
                        </>
                    ) : (
                        <button className="profile-edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
