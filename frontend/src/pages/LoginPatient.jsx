import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const LoginPatient = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="w-full max-w-md p-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Patient Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            required
          />
        </div>
        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            "Login"
          )}
        </button>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-green-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="px-8 py-4 mt-6 bg-gray-900 bg-opacity-50 flex justify-center rounded-md">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPatient;
