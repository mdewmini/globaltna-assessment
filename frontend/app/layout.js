import "./globals.css";

export const metadata = {
  title: "GlobalTNA | Service Request Board",
  description: "Post and browse home service requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <a href="/" className="nav-brand">🔧 GlobalTNA</a>
          <div className="nav-links">
            <a href="/">Browse Jobs</a>
            <a href="/new" className="btn-primary">+ Post a Job</a>
          </div>
        </nav>
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
