"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-5xl font-bold capitalize text-sky-500">
        weather app
      </h1>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default Header;
