"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "flowbite-react";

type User = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (forgot) {
      try {
        setLoading(true);
        const { data } = await axios.post("api/users/getcode", {
          email: user.email,
        });
        router.push("/forgotpassword");
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post("api/users/login", user);
        router.push("/");
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto my-6 p-6 shadow-2xl rounded-xl">
        <h1 className="text-4xl font-semibold mb-4 mt-2 text-center text-blue-600">
          {!forgot ? "Log In" : "Get Code"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg text-blue-600 font-extralight"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="umarziaii@gmail.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="border border-blue-600 rounded-lg w-full focus:outline-none text-blue-600 px-4 py-2"
            />
          </div>
          {!forgot && (
            <div>
              <label
                htmlFor="password"
                className="block text-lg text-blue-600 font-extralight"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="border border-blue-600 rounded-lg w-full focus:outline-none text-blue-600 px-4 py-2"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={forgot ? !user.email : isDisabled}
            className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ${
              isDisabled ? "bg-opacity-75 border-opacity-75" : "bg-opacity-100"
            }`}
          >
            {loading && <Spinner color="success" className="mx-4" />}
            <span>{!forgot ? "Log In" : "Get Code"}</span>
          </button>
        </form>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 mt-2 text-sm">
            Don't have Account{" "}
            <Link
              href="/signup"
              className="hover:underline hover:text-blue-600 hover:underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
          <p
            className="text-gray-400 mt-2 text-sm hover:underline hover:text-blue-600 hover:underline-offset-4 cursor-pointer"
            onClick={() => setForgot(!forgot)}
          >
            {forgot ? "Log In" : "Forgot Password"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
