export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="w-10 h-10 border-4 border-t-cyan-400 border-gray-200 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
