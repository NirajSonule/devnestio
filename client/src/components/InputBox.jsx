const InputBox = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
  endIcon,
}) => {
  const baseStyles =
    "bg-light-bg py-2 px-4 text-sm outline-none rounded-sm transition duration-200 w-full";

  const stateStyles = {
    default:
      "text-gray-200 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    error:
      "text-red-200 border border-red-700 focus:border-red-500 focus:ring-1 focus:ring-red-500",
  };

  const currentStyle = error ? stateStyles.error : stateStyles.default;

  return (
    <div className={className}>
      {label && (
        <p className="block mb-1 text-sm font-medium text-gray-200">{label}</p>
      )}
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseStyles} ${currentStyle} pr-10`}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default InputBox;
