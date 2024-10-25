import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RightBanner from "../commonComponent/RightBanner";
import AuthContext from "../../context/AuthContext";
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser, authError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    let validationErrors = {};
    setErrors({});

    if (!email) {
      validationErrors.email = "Email or Phone is required.";
    }
    if (!password) {
      validationErrors.password = "Password is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Call login function from AuthContext
        const { token, role } = await loginUser({ email, password });

        // Store token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        Swal.fire({
          icon: 'success',
          title: 'Login successfully!!',
          text: 'Your operation was successful.',
          confirmButtonText: 'OK',
        });

        // Navigate based on the user role
        if (role === 'doctor') {
          navigate("/doctor/profile-setting");
        } else if (role === 'admin') {
          navigate("/admin/profile-setting");
        } else if (role === 'patient') {
          navigate("/patient/patient-dashboard");
        } else {
          // Fallback in case role is unrecognized
          navigate("/dashboard");
        }
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Something went wrong!',
          confirmButtonText: 'Try Again',
        }); 
        setErrors({ password: authError || "Login failed, try again" });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email or Phone Input */}
            <div className="relative mb-4">
              <input
                type="text"
                id="email"
                name="email"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Email or Phone<span className="text-red-500">*</span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "password" : "text"} // Conditionally set the type
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Password<span className="text-red-500">*</span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              {/* Add the icon */}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" required />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-200 text-gray-500 font-semibold rounded-md hover:bg-customBlue hover:text-white transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Registration
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <RightBanner />
    </div>
  );
};

export default Login;
