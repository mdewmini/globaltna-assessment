"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;
const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", description: "", category: "Plumbing",
    location: "", contactName: "", contactEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail))
      e.contactEmail = "Enter a valid email";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) router.push(`/jobs/${data.data._id}`);
      else setErrors({ server: data.error });
    } catch {
      setErrors({ server: "Failed to submit. Is the backend running?" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Post a Service Request</h1>
        <Link href="/" className="btn-secondary">← Back</Link>
      </div>
      <div className="form-card">
        {errors.server && (
          <div style={{ color: "var(--danger)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {errors.server}
          </div>
        )}
        <div className="form-group">
          <label>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Leaking kitchen tap" />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the work needed..." />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Glasgow" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Contact Name</label>
            <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="you@example.com" />
            {errors.contactEmail && <div className="error">{errors.contactEmail}</div>}
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Post Job"}
          </button>
          <Link href="/" className="btn-secondary">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

