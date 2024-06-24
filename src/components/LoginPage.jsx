import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ onLogin }) => {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPLoading, setIsOTPLoading] = useState(false);

  const handleLoginClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        toast.success(
          "Login successful. Please enter the OTP sent to your email."
        );
        setEmail(response.data.email); // Assuming the email is returned in the response
        setShowOTPInput(true);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.response && error.response.status === 401) {
        toast.error("Wrong password. Please try again.");
      } else {
        toast.error("Failed to login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOTPSubmit = async () => {
    setIsOTPLoading(true);

    if (!otp.includes("")) {
      try {
        const response = await axios.post(
          "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/verify_otp_code",
          {
            email_to_verify: email,
            otp_to_verify: otp.join(""),
          }
        );

        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("jwt", token);
          toast.success("OTP verified successfully. You are now logged in.");
          onLogin();
        }
      } catch (error) {
        console.error("OTP verification failed:", error.message);
        toast.error("OTP verification failed. Please try again.");
      } finally {
        setIsOTPLoading(false);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="max-w-lg mx-auto p-8 bg-[#fff4f4] rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {showOTPInput ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Enter OTP</h3>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="border outline-none rounded w-full py-2 px-3 mb-3"
              type="email"
              placeholder="Enter your email"
              value={email}
              readOnly
            />
            <div className="flex space-x-4">
              {otp.map((digit, index) => (
                <input
                  id={`otp-input-${index}`}
                  key={index}
                  className="border rounded w-12 text-center py-2 px-3 mb-3"
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  maxLength={1}
                />
              ))}
            </div>
            <p className="my-2">Your OTP is valid for 3 minutes</p>
            <button
              className="bg-[#ef6426] hover:bg-[#cb5925] text-white font-bold py-2 px-4 rounded-full"
              onClick={handleOTPSubmit}
            >
              {isOTPLoading ? (
                <LoadingIcons.ThreeDots width="30px" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        ) : (
          <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="border outline-none rounded w-full py-2 px-3 mb-3"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="border outline-none rounded w-full py-2 px-3 mb-3"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`bg-[#ef6426] text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center ${
                isLoading || !username || !password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-[#cb5925]"
              }`}
              onClick={handleLoginClick}
              disabled={isLoading || !username || !password}
            >
              {isLoading ? <LoadingIcons.ThreeDots width="30px" /> : "Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
