import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useAuth } from "../contexts/authContext.jsx";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErros] = useState({});
  const [formErrors, setFormErrors] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await register(username, email, password);

      if (result.success) {
        navigate("/");
      } else {
        if (result.errors) {
          setErros(result.errors);
          setFormErrors("");
        } else {
          setErros({});
          setFormErrors(result.data.message || "Registration Failed");
          console.log(formErrors);
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
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username?._errors?.[0]}
          />
          <InputBox
            type="email"
            label="Email"
            placeholder="john@app.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email?._errors?.[0]}
          />
          <InputBox
            type="password"
            label="Password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
