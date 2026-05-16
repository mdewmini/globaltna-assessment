'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        🔧 GlobalTNA
      </Link>
      <div className="nav-links">
        <Link
          href="/"
          style={{ color: path === '/' ? 'var(--text)' : 'var(--muted)' }}
        >
          Browse Jobs
        </Link>
        <Link href="/new" className="btn-primary">
          + Post a Job
        </Link>
      </div>
    </nav>
  );
}