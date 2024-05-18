"use client";

import axios from "axios";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (otp.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [otp]);

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { otp });
      setIsVerified(true);
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      setVerifyError(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto my-6 p-6 shadow-2xl rounded-xl">
        <h1 className="text-4xl font-semibold mb-4 mt-2 text-center text-blue-600">
          Verify Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-lg text-blue-600 font-extralight"
            >
              Verification Code
            </label>
            <input
              type="text"
              name="verificationCode"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
            {loading ? <Spinner color="success" /> : "Verify Email"}
          </button>
        </form>
        <span className="text-gray-500 text-sm text-start">
          {verifyError && verifyError}
        </span>
      </div>
    </div>
  );
};
export default Home;
