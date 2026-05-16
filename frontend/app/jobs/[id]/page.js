"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;
const STATUSES = ["Open", "In Progress", "Closed"];

function StatusBadge({ status }) {
  const cls = status.replace(" ", "");
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API}/jobs/${id}`);
        const data = await res.json();
        if (data.success) { setJob(data.data); setNewStatus(data.data.status); }
        else setError("Job not found.");
      } catch { setError("Failed to load job."); }
      finally { setLoading(false); }
    };
    fetchJob();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus === job.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setJob(data.data);
      else setError(data.error);
    } catch { setError("Update failed."); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/jobs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) router.push("/");
      else setError(data.error);
    } catch { setError("Delete failed."); }
    finally { setDeleting(false); }
  };

  if (loading) return <p style={{ color: "var(--muted)" }}>Loading...</p>;
  if (error) return <div className="empty-state"><h2>{error}</h2><Link href="/" className="btn-secondary" style={{ marginTop: "1rem" }}>← Back to jobs</Link></div>;

  return (
    <div>
      <div className="page-header">
        <Link href="/" className="btn-secondary">← All Jobs</Link>
      </div>
      <div className="detail-card">
        <div className="detail-header">
          <h1>{job.title}</h1>
          <StatusBadge status={job.status} />
        </div>

        <div className="detail-meta">
          <div className="detail-meta-item">
            <label>Category</label>
            <span>{job.category || "—"}</span>
          </div>
          <div className="detail-meta-item">
            <label>Location</label>
            <span>{job.location || "—"}</span>
          </div>
          <div className="detail-meta-item">
            <label>Contact</label>
            <span>{job.contactName || "—"}</span>
          </div>
          <div className="detail-meta-item">
            <label>Email</label>
            <span>{job.contactEmail || "—"}</span>
          </div>
          <div className="detail-meta-item">
            <label>Posted</label>
            <span>{new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>

        <div className="detail-description">
          <p>{job.description}</p>
        </div>

        {error && <p style={{ color: "var(--danger)", marginBottom: "1rem" }}>{error}</p>}

        <div className="detail-actions">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{ padding: "0.55rem 0.9rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", fontSize: "0.9rem" }}
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary" onClick={handleStatusUpdate} disabled={updating || newStatus === job.status}>
            {updating ? "Saving..." : "Update Status"}
          </button>
          <button className="btn-danger" onClick={handleDelete} disabled={deleting} style={{ marginLeft: "auto" }}>
            {deleting ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

