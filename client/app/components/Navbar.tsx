import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className="border m-2 rounded-md border-blue-800 flex justify-between p-4">
      <h1 className=" text-4xl font-semibold">
        <Link href="/" className="flex gap-2 items-center">
          <Image width={40} alt="Logo" src={Logo}/>
          Project_<span className="text-blue-800">TLE</span>
        </Link>        
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
