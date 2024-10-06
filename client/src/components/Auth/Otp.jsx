import React, { useState, useEffect } from "react";
import RightBanner from "../commonComponent/RightBanner";
import { useNavigate } from "react-router-dom"; // Use navigate for routing
import { FiClock } from "react-icons/fi";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState("");
  const [timer, setTimer] = useState(30); // 30 seconds timer for OTP
  const [touched, setTouched] = useState(new Array(6).fill(false)); // To track touched fields

  const navigate = useNavigate(); // For navigation

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    // Mark the field as touched
    setTouched((prevTouched) =>
      prevTouched.map((val, idx) => (idx === index ? true : val))
    );
  };

  // Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const emptyFields = otp.some((value) => value === "");
    if (emptyFields) {
      setErrors("Please fill all fields.");
    } else {
      setErrors("");
      // Perform OTP verification action here
      console.log("OTP entered:", otp.join(""));
      // Navigate to the reset password page
      navigate("/reset-password");
    }
  };

  // Handle Resend OTP (reset the timer)
  const handleResendOtp = () => {
    setOtp(new Array(6).fill(""));
    setTouched(new Array(6).fill(false)); // Reset touched state
    setTimer(30); // Reset the timer
    console.log("OTP resent");
  };

  // Update timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Format the timer as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - OTP Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-medium mb-4">Enter OTP</h2>
          <p className="mb-4 text-sm text-gray-500">
            Please enter the 6-digit code that was sent to your phone number.
          </p>
          <form onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div className="flex justify-between mb-4">
              {otp.map((data, index) => (
                <input
                  className={`w-12 h-12 text-center border rounded-md focus:outline-none ${
                    errors 
                      ? "border-red-500 text-red-500 font-semibold"
                      : "border-gray-300"
                  }`}
                  placeholder="0"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            {/* Timer and Resend OTP */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm flex items-center">
                {timer > 0 ? (
                  <>
                    <FiClock className="mr-1" /> {formatTime(timer)} sec
                  </>
                ) : (
                  "OTP expired"
                )}
              </span>
              {timer === 0 && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-200 text-gray-500 font-semibold rounded-md hover:bg-customBlue hover:text-white transition duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <RightBanner />
    </div>
  );
};

export default Otp;
