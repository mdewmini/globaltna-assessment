import Link from 'next/link';
import StatusBadge from './StatusBadge';

const CATEGORY_ICONS = {
  Plumbing:    '🔧',
  Electrical:  '⚡',
  Painting:    '🎨',
  Joinery:     '🪚',
  Roofing:     '🏠',
  Landscaping: '🌿',
  Other:       '🔨',
};

export default function JobCard({ job }) {
  const icon = CATEGORY_ICONS[job.category] ?? '🔨';
  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/jobs/${job._id}`} className="job-card">
      <h3>{icon} {job.title}</h3>
      <p>{job.description}</p>
      <div className="job-card-meta">
        <span>📍 {job.location || '—'} · {job.category}</span>
        <StatusBadge status={job.status} />
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
        Posted {date}
      </div>
    </Link>
  );
}