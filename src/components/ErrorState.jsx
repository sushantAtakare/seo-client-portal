export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-6 py-10 text-center">
      <p className="text-base font-medium text-white">{title}</p>
      {message ? (
        <p className="mx-auto mt-2 max-w-lg text-sm text-rose-200/90">{message}</p>
      ) : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
