"use client";

import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#232F3E] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#2E3A47] rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <img
            src="/img/logo_2.png"
            alt="Company Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
          <p className="text-gray-400 text-sm">
            Please sign in to access the administration panel.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="text-gray-300 text-sm">
              Username
            </label>
            <div className="flex items-center border border-gray-600 bg-gray-700 rounded-lg mt-1">
              <FaUser className="text-gray-400 mx-3" />
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full bg-transparent text-white placeholder-gray-400 p-2 outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-gray-300 text-sm">
              Password
            </label>
            <div className="flex items-center border border-gray-600 bg-gray-700 rounded-lg mt-1">
              <FaLock className="text-gray-400 mx-3" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-white placeholder-gray-400 p-2 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
