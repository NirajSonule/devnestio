const Toast = ({ type, message }) => {
  const baseStyles =
    "px-6 py-2 rounded shadow-md transition-opacity duration-300";

  const stateStyles = {
    primary: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500 text-white",
  };

  return (
    <div
      className={`${baseStyles} ${stateStyles[type] || stateStyles.primary}`}
    >
      {message}
    </div>
  );
};

export default Toast;
