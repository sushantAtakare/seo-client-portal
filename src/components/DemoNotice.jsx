export default function DemoNotice({ message }) {
  if (!message) return null;

  return (
    <div
      className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200"
      role="status"
    >
      {message}
    </div>
  );
}
