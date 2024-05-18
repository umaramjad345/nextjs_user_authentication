"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "flowbite-react";

type User = {
  username: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("api/users/signup", user);
      router.push("/verifyemail");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto my-6 p-6 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-semibold mb-4 mt-2 text-center text-blue-600">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-lg text-blue-600 font-extralight"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              placeholder="umarziaii"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              className="border border-blue-600 rounded-lg w-full focus:outline-none text-blue-600 px-4 py-2"
            />
          </div>
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
              placeholder="umarziaii345@gmail.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="border border-blue-600 rounded-lg w-full focus:outline-none text-blue-600 px-4 py-2"
            />
          </div>
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
              required
              className="border border-blue-600 rounded-lg w-full focus:outline-none text-blue-600 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ${
              isDisabled ? "bg-opacity-75 border-opacity-75" : "bg-opacity-100"
            }`}
          >
            {loading ? <Spinner color="success" className="mx-4" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-400 mt-2 text-sm">
          Already have an Account{" "}
          <Link
            href="/login"
            className="hover:underline hover:text-blue-600 hover:underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
