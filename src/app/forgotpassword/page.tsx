"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "flowbite-react";

const LoginPage = () => {
  const router = useRouter();

  const [code, setCode] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (code.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [code]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("api/users/verifycode", { code });
      if (data?.success !== true) {
        console.log(data.message);
        return;
      }
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto my-6 p-6 shadow-2xl rounded-xl">
        <h1 className="text-4xl font-semibold mb-4 mt-2 text-center text-blue-600">
          Verify
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-lg text-blue-600 font-extralight"
            >
              Verification Code:
            </label>
            <input
              type="text"
              name="verificationCode"
              value={code}
              placeholder="e.g. 1234"
              onChange={(e) => setCode(e.target.value)}
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
            {loading ? <Spinner color="success" /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
