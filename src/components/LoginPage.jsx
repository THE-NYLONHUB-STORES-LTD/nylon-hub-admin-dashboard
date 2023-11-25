import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = ({ onLogin }) => {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPLoading, setIsOTPLoading] = useState(false);

  const handleLoginClick = async () => {
    setIsLoading(true);
    setShowOTPInput(true);

    try {
      const response = await axios.post(
        "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/login",
        {
          username,
          password,
        }
      );

      console.log("Login response status:", response.status);

      if (response.status === 200) {
        const otpResponse = await axios.post(
          "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/generate_otp_code",
          {
            email,
          }
        );

        console.log("OTP response status:", otpResponse.status);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("failed to login");
      setShowOTPInput(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    // Update the OTP array with the entered digit
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move to the next input box if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOTPSubmit = async () => {
    setIsOTPLoading(true);
    if (!otp.includes("")) {
      try {
        // Make a request to verify the OTP
        const otpResponse = await axios.post(
          "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/verify_otp_code",
          {
            email_to_verify: email,
            otp_to_verify: otp.join(""),
          }
        );
  
        console.log("OTP verification response status:", otpResponse.status);
  
        // If OTP verification is successful, decode the token and send it as a header
        if (otpResponse.status === 200) {
          const decodedToken = jwtDecode(otpResponse.data.token);
          console.log("Decoded token:", decodedToken);
  
          // Create an axios instance with the decoded token in the headers
          const instance = axios.create({
            headers: { Authorization: `Bearer ${decodedToken}` },
          });
  
          //  a POST request
          const response = await instance.post(
            "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/verify_otp_code"
          );
          console.log("Response for post:", response.data);
  
          onLogin();
        }
      } catch (error) {
        // Handle OTP verification error
        console.error("OTP verification failed:", error.message);
        setIsOTPLoading(false);
        setErrorMessage("OTP verification failed");
      }
    }
  };
  
  
  

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className=" max-w-lg mx-auto  p-8 bg-[#fff4f4] rounded-md ">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
              onChange={(e) => setEmail(e.target.value)}
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
            <p className=" my-2">Your OTP is valid for 3 minutes</p>
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
              className={`bg-[#ef6426]  text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center ${
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
