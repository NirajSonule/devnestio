import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useAuth } from "../contexts/AuthContext";
import { registerValidation } from "../utils/validationSchema";
import { useToast } from "../contexts/ToastContext";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, email, password };
    const validationResult = registerValidation.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
      return;
    }

    try {
      const result = await register(username, email, password);

      if (result.success) {
        addToast({ type: "primary", message: "Account created successfully!" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({});
          addToast({ type: "danger", message: result.message });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-dark-bg font-Inter flex justify-center items-center">
      <div className="py-6 px-4 sm:px-12 bg-light-bg rounded-sm flex flex-col space-y-6">
        <h2 className="text-2xl text-gray-200 font-bold">Create New Account</h2>
        <form
          onSubmit={handleSubmit}
          className="p-2 flex flex-col justify-center space-y-5"
        >
          <InputBox
            type="text"
            label="Username"
            placeholder="John"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            error={errors.username?._errors?.[0]}
          />
          <InputBox
            type="email"
            label="Email"
            placeholder="john@app.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email?._errors?.[0]}
          />
          <InputBox
            type="password"
            label="Password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password?._errors?.[0]}
          />
          <Button type="submit" state="primary">
            Sign up
          </Button>
        </form>
        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
