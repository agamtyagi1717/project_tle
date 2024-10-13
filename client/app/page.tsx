import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="h-full flex justify-center gap-4 items-center flex-col mt-40">
        <p className="text-xl md:text-3xl w-[70vw] text-center">
          An online compiler to write ✍️, run 🚀, and debug code instantly
          across multiple languages, all in one place! 💻
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
