const A = "#df7224";

export default function Field({
  label,
  required,
  error,
  hint,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {label}
        {required && (
          <span
            className="ml-0.5"
            style={{ color: A }}
          >
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="text-[10px] text-gray-400">
          {hint}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}