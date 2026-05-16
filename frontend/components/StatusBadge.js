export default function StatusBadge({ status }) {
    const cls = status.replace(' ', '');
    return (
      <span className={`badge badge-${cls}`}>
        {status}
      </span>
    );
  }