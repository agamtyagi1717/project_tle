import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border m-2 rounded-md border-blue-800 flex justify-between p-5">
      <h1 className=" text-4xl font-semibold">
        <Link href="/">
          project_<span className="text-blue-800">tle</span>
        </Link>        
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
