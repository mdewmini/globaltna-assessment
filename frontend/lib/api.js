const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchJobs(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/jobs${query ? `?${query}` : ''}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const data = await res.json();
  return data.data;
}

export async function fetchJob(id) {
  const res = await fetch(`${BASE}/jobs/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch job');
  const data = await res.json();
  return data.data;
}

export async function createJob(formData) {
  const res = await fetch(`${BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create job');
  return data.data;
}

export async function updateJobStatus(id, status) {
  const res = await fetch(`${BASE}/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update status');
  return data.data;
}

export async function deleteJob(id) {
  const res = await fetch(`${BASE}/jobs/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete job');
  return data;
}