import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword]=useState(false);


  // Handle Login

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate("/dashboard");
      })
      .catch((err) => setError(err.message));
  };

  // Handle Google Login
  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate("/dashboard");
      })
      .catch((err) => setError(err.message));
  };


  return (
    <div className="flex justify-center items-center mt-15 min-h-[70vh]">
      <Toaster />
      <form onSubmit={handleLogin} className="bg-base-200 p-8 rounded-lg w-96 space-y-3">
        <h2 className="text-2xl font-bold text-center">Login</h2>

         {/* Email Input */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <div className="relative">

        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 z-10">
          {
            showPassword ? (<IoEye />) : (<IoMdEyeOff />)
          }

        </button>
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-right">
          <button
            type="button"
            onClick={() => navigate("/forget-password")}
            className="text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Login Button */}
        <button className="btn btn-outline btn-primary w-full">Login</button>

        <p className="font-bold text-[#516445] text-center">---- or ----</p>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline btn-secondary w-full"
        >
          Login with Google
        </button>
        <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
      </p>

      </form>
    </div>
  );
};

export default Login;

