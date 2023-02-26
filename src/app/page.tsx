"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import useSwr from "swr";

const ReactSkinview3d = dynamic(() => import("react-skinview3d"), {
  ssr: false,
});

const Page = () => {
  const [username, setUsername] = useState("UmutKiziloglu");
  const [progress, setProgress] = useState(0);

  const { data, error } = useSwr(
    `https://api.ashcon.app/mojang/v2/user/${username}`,
    async (url) => {
      const { data } = await axios.get(url);
      return data;
    }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const submitUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.username.value);
  };

  const Input = () => {
    return (
      <form
        onSubmit={submitUsername}
        className="w-full flex justify-center items-center"
      >
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative flex items-center justify-center">
          <input
            type="search"
            id="username"
            className="block w-72 p-2 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
            name="username"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      <header>
        <h1 className="text-4xl text-white">Minecraft Skin Finder</h1>
      </header>
      <main className="space-y-8">
        <Input />
        <ReactSkinview3d
          skinUrl={data.textures.skin.url}
          capeUrl={data.textures.cape?.url}
          options={{ pixelRatio: "match-device" }}
          onReady={({ viewer }) => {}}
          width={500}
          height={650}
        />
      </main>
      <footer>
        <p className="text-white text-lg">
          Made By <a href="https://www.umutk.me">UmutKDev</a>
        </p>
      </footer>
    </>
  );
};

export default Page;
