"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { backendUrl } from "@/configs/constants";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API directly
      const response = await axios.post(
        `${backendUrl}/api/users/login`,
        {
          email,
          password,
        }
      );

      // Set the token and user data in cookies if login is successful
      const { token, user } = response.data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      setUser(user);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      // Handle different error scenarios
      if (axios.isAxiosError(error) && error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 401) {
          setError("Invalid email or password. Please try again.");
          toast.error("Invalid email or password. Please try again.");
        } else if (error.response.status === 500) {
          setError("Internal server error. Please try again later.");
          toast.error("Internal server error. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else if (axios.isAxiosError(error) && error.request) {
        // Request was made but no response received
        setError(
          "Network error. Please check your internet connection and try again."
        );
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        // Other errors (unexpected errors)
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-extrabold text-center">Log In</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log In
      </button>
      <h5>
        Don't have an account?{" "}
        <Link href={"/signup"} className="text-sky-500">
          Create One
        </Link>{" "}
      </h5>
    </form>
  );
};

export default Login;
