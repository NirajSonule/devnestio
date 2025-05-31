import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useAuth } from "../contexts/AuthContext.jsx";
import { loginValidation } from "../utils/validationSchema";
import { useToast } from "../contexts/ToastContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };
    const validationResult = loginValidation.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
      return;
    }

    try {
      const result = await login(email, password);
      console.log("reached try");
      if (result.success) {
        addToast({ type: "primary", message: "Login Successful!" });
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
        <h2 className="text-2xl text-gray-200 font-bold">
          Login to Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-2 flex flex-col justify-center space-y-5"
        >
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
            Login
          </Button>
        </form>
        <p className="text-sm text-gray-400 text-center">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
