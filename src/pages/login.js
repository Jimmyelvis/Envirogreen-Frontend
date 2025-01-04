// pages/login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/ui/Layout";
import { useDispatch } from "react-redux";
import { loginUser } from "@/ReduxStore/slices/userSlice";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .unwrap()
      .then((originalPromiseResult) => {
        router.push("/"); // Redirect after login
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here, such as updating a state to show in the UI
      });
  };

  return (
    <Layout>
      <div className="auth-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-lg font-bold mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
