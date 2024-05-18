"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

type User = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setUser(data.user);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsUpdating(true);
      const { data } = await axios.post("/api/users/update", user, {
        withCredentials: true,
      });
      if (data.success === false) {
        console.log(data.message);
      }
      setIsUpdating(false);
      setUpdateMessage(data.message);
    } catch (error: any) {
      setIsUpdating(false);
      console.log(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const { data } = await axios.get("api/users/logout", {
        withCredentials: true,
      });
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setIsLoggingOut(false);
      router.push("/login");
    } catch (error: any) {
      setIsLoggingOut(false);
      console.log(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      setIsDeleting(true);
      const { data } = await axios.delete("/api/users/delete", {
        withCredentials: true,
      });
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setIsDeleting(false);
      router.push("/login");
    } catch (error: any) {
      setIsDeleting(false);
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto my-6 p-6 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-semibold mb-4 mt-2 text-center text-blue-600">
          Profile
        </h1>
        <div className="w-28 h-28 rounded-full flex items-center justify-center bg-blue-600 text-white text-6xl mx-auto">
          {user.username.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white text-sm font-medium px-2 py-1 rounded-md w-fit">
            {user?.isAdmin ? "Admin" : "User"}
          </div>
        </div>
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
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              value={user?.email}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            {isUpdating ? <Spinner color="success" /> : " Update"}
          </button>
        </form>
        <span className="text-gray-500 text-sm text-start">
          {updateMessage}
        </span>
        <div className="flex justify-between gap-4 mt-5">
          <button
            disabled={isDisabled}
            onClick={handleDeleteUser}
            className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ${
              isDisabled ? "bg-opacity-75 border-opacity-75" : "bg-opacity-100"
            }`}
          >
            {isDeleting ? <Spinner color="success" /> : " Delete Account"}
          </button>
          <button
            disabled={isDisabled}
            onClick={handleLogout}
            className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ${
              isDisabled ? "bg-opacity-75 border-opacity-75" : "bg-opacity-100"
            }`}
          >
            {isLoggingOut ? <Spinner color="success" /> : "LogOut"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
