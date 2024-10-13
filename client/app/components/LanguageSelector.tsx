"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
  setLanguageID: (language: number) => void;
  setCode: (language: string) => void;
}

const languageData = [
  {
    language: "javascript",
    id: 102,
    boilerplate: `// Fibonacci series in JavaScript
function fibonacci(n) {
  let a = 0, b = 1, next;
  for (let i = 1; i <= n; i++) {
    console.log(a);
    next = a + b;
    a = b;
    b = next;
  }
}
fibonacci(10);`,
  },
  {
    language: "typescript",
    id: 101,
    boilerplate: `// Fibonacci series in TypeScript
function fibonacci(n: number): void {
  let a: number = 0, b: number = 1, next: number;
  for (let i = 1; i <= n; i++) {
    console.log(a);
    next = a + b;
    a = b;
    b = next;
  }
}
fibonacci(10);`,
  },
  {
    language: "cpp",
    id: 105,
    boilerplate: `// Fibonacci series in C++
#include <iostream>
using namespace std;

void fibonacci(int n) {
  int a = 0, b = 1, next;
  for (int i = 1; i <= n; ++i) {
      cout << a << " ";
      next = a + b;
      a = b;
      b = next;
  }
  cout << endl;
}

int main() {
  fibonacci(10);
  return 0;
}`,
  },
  {
    language: "python",
    id: 100,
    boilerplate: `# Fibonacci series in Python
def fibonacci(n):
  a, b = 0, 1
  for _ in range(n):
    print(a)
    a, b = b, a + b

fibonacci(10)`,
  },
];

export function LanguageSelector({
  language,
  setLanguage,
  setLanguageID,
  setCode,
}: LanguageSelectorProps) {
  const handleLanguageChange: any = (index: number) => {
    setLanguage(languageData[index].language);
    setLanguageID(languageData[index].id);
    setCode(languageData[index].boilerplate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Language: {language}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuCheckboxItem onClick={() => handleLanguageChange(0)}>
          JavaScript (Node.js 22.08.0)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => handleLanguageChange(1)}>
          TypeScript (5.6.2)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => handleLanguageChange(2)}>
          C++ (GCC 14.1.0)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => handleLanguageChange(3)}>
          Python (3.12.5)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
