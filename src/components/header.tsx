"use client";

import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-5xl font-bold capitalize text-sky-500">
        weather app
      </h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Header;
