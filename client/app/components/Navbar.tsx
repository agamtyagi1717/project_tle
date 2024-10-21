import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="m-3 flex justify-between p-4">
      <Link href="/" className="flex gap-4 items-center">
        <Image width={40} alt="Logo" src={Logo} />
        <h1
          className="text-4xl font-semibold"
          style={{
            textShadow:
              "1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black",
          }}
        >
          Project_TLE
        </h1>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
