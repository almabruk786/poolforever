import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0e17",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#22d3ee" }}>404</h1>
      <p style={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "2rem" }}>
        Page not found
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 2rem",
          background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
          color: "#fff",
          borderRadius: "9999px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
