import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const Toast = ({ type, message }) => {
  const baseStyles =
    "flex items-center gap-3 px-6 py-2 rounded shadow-md transition-opacity duration-300";

  const stateStyles = {
    primary: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500 text-white",
  };

  const icons = {
    primary: <CheckCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    danger: <XCircle size={20} />,
  };

  const iconColor = {
    primary: "text-white",
    warning: "text-black",
    danger: "text-white",
  };

  const Icon = icons[type] || icons.primary;

  return (
    <div
      className={`${baseStyles} ${stateStyles[type] || stateStyles.primary}`}
    >
      <span className={iconColor[type] || iconColor.primary}>{Icon}</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
