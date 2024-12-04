"use client";

import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#232F3E] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#2E3A47] rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <img
            src="/img/logo_2.png"
            alt="Company Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
          <p className="text-gray-400 text-sm">
            Enter your email address below and we'll send you instructions to
            reset your password.
          </p>
        </div>
        <form className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="text-gray-300 text-sm">
              Email Address
            </label>
            <div className="flex items-center border border-gray-600 bg-gray-700 rounded-lg mt-1">
              <FaEnvelope className="text-gray-400 mx-3" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-white placeholder-gray-400 p-2 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Remembered your password?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Go back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
