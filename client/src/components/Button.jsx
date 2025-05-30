const Button = ({ className, state, children, onClick }) => {
  const baseStyles = "py-2 px-6 rounded-md text-sm transition-all duration-200";

  const stateStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer",
    secondary: "bg-violet-500 text-white hover:bg-violet-600 cursor-pointer",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer",
    danger: "bg-red-500 text-white hover:bg-red-600 cursor-pointer",
    disabled: "bg-gray-700 text-gray-400 cursor-not-allowed",
  };

  return (
    <button
      className={`${baseStyles} ${stateStyles[state]}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
