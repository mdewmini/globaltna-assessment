"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORIES = ["All", "Plumbing", "Electrical", "Painting", "Joinery", "Other"];
const STATUSES = ["All", "Open", "In Progress", "Closed"];
const API = process.env.NEXT_PUBLIC_API_URL;

function StatusBadge({ status }) {
  const cls = status.replace(" ", "");
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== "All") params.append("category", category);
        if (status !== "All") params.append("status", status);
        if (search.trim()) params.append("search", search.trim());

        const res = await fetch(`${API}/jobs?${params}`);
        const data = await res.json();
        if (data.success) setJobs(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [category, status, search]);

  return (
    <div>
      <div className="page-header">
        <h1>Service Requests</h1>
        <Link href="/new" className="btn-primary">+ Post a Job</Link>
      </div>

      <div className="filter-bar">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, maxWidth: 280 }}
        />
      </div>

      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <h2>No jobs found</h2>
          <p>Try adjusting your filters or post the first job.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <Link key={job._id} href={`/jobs/${job._id}`} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <div className="job-card-meta">
                <span>📍 {job.location || "—"} · {job.category}</span>
                <StatusBadge status={job.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

