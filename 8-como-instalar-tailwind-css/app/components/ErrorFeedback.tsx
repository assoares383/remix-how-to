export function ErrorFeedback() {
  return (
    <div className="bg-red-100 border border-red-500 p-12">
      <span className="text-red-500 font-bold text-2x1">
        Something went wrong
      </span>
      <pre className="text-red-500"></pre>
    </div>
  );
}
