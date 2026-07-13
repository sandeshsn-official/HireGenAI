"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await loginUser(formData);

      toast.success(data.message);

      localStorage.setItem("token", data.token);

    localStorage.setItem(
    "user",
  JSON.stringify(data.user)
    );

router.push("/dashboard");

      console.log(data);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black"
            />

          </div>

          <div>

            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}