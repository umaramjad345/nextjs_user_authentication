"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div className="overflow-hidden h-screen">
      <div className="flex justify-end">
        <Link href="/profile">
          <button className="text-xl font-semibold bg-blue-600 text-white px-4 py-2 m-5 rounded-xl border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300">
            My Profile
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center mt-32">
        <h1 className="bg-blue-600 py-4 px-8 text-white text-2xl font-semibold rounded-lg shadow-2xl border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300">
          My Secret Page
        </h1>
      </div>
    </div>
  );
};
export default Home;
