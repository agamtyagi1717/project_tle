"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("https://project-tle.onrender.com")
    // fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error fetching the data:", error));
  }, []);

  return (
    <div>
      <div className="h-full flex justify-center gap-4 items-center flex-col mt-40">
        <p className="text-xl md:text-3xl w-[70vw] text-center">
          A collaborative online coding environment to write ✍️, run 🚀, and
          debug code instantly across multiple languages, with real-time
          collaboration and sharing, all in one place! 💻
        </p>
        <Link href="/sandbox">
          <Button
            variant="outline"
            className="py-2 border border-blue-800 flex gap-2 text-md font-semibold"
          >
            Start coding
            <ArrowRight
              size={20}
              color="rgb(30 64 175 / var(--tw-border-opacity))"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
