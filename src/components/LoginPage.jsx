import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import axios from "axios";

const LoginPage = ({ onLogin }) => {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

//   const [countdown, setCountdown] = useState(300); // Add this line

//   useEffect(() => {
//     if (showOTPInput && countdown > 0) {
//       const timer = setTimeout(() => {
//         setCountdown(countdown - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [showOTPInput, countdown]);

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      // Make a request to the login endpoint
      const response = await axios.post(
        "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/login",
        {
          email,
          password,
        }
      );

      // If login is successful, send the OTP
      if (response.status === 200) {
        const otpResponse = await axios.post(
          "https://3gl1qmkg-4000.uks1.devtunnels.ms/admin_service/generate_otp_code",
          {
            email: email,
          }
        );

        // If OTP is successfully sent, show the OTP input field
        if (otpResponse.status === 200) {
          setShowOTPInput(true);
        }
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
      setErrorMessage("Unauthorized to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = async (index, value) => {
    // Update the OTP array with the entered digit
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move to the next input box if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // If all OTP digits are entered, verify OTP with the backend
    if (index === otp.length - 1 && !newOTP.includes("")) {
      try {
        // Make a request to verify the OTP
        const response = await axios.post("backend_verify_otp_endpoint", {
          email,
          otp: newOTP.join(""),
        });

        // If OTP verification is successful, call onLogin
        if (response.status === 200) {
          onLogin();
        }
      } catch (error) {
        // Handle OTP verification error
        console.error("OTP verification failed:", error.message);
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
            <p className=" my-2">
                Your OTP is valid for 5 minutes
              {/* Your OTP is valid for {Math.floor(countdown / 60)} minutes and{" "}
              {countdown % 60} seconds. */}
            </p>
            <button className="bg-[#ef6426] hover:bg-[#cb5925] text-white font-bold py-2 px-4 rounded-full">
              Verify OTP
            </button>
          </div>
        ) : (
          <>
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
                isLoading || !email || !password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-[#cb5925]"
              }`}
              onClick={handleLoginClick}
              disabled={isLoading || !email || !password}
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
