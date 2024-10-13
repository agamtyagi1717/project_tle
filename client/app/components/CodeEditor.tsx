"use client";

import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { Moon, Play, Sun } from "lucide-react";

interface CodeEditorProps {
  setCodeToken: (codeToken: string) => void;
  codeInput: string;
}

const CodeEditor = ({ setCodeToken, codeInput }: CodeEditorProps) => {
  const [editorTheme, setEditorTheme] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [languageID, setLanguageID] = useState(102);
  const [code, setCode] = useState(
    `// Fibonacci series in JavaScript
function fibonacci(n) {
  let a = 0, b = 1, next;
  for (let i = 1; i <= n; i++) {
    console.log(a);
    next = a + b;
    a = b;
    b = next;
  }
}
fibonacci(10);`
  );

  useEffect(() => {
    setCode(code);
  }, [code, setCode]);

  const runCode = async () => {
    console.log(codeInput);

    const url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: btoa(code),
        language_id: languageID,
        stdin: btoa(codeInput),
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const tokenObject = JSON.parse(result);
      setCodeToken(tokenObject.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end md:flex-row flex-col mb-2 gap-2">
        <Button variant="outline" onClick={() => setEditorTheme(!editorTheme)}>
          {editorTheme ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        <LanguageSelector
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          setLanguageID={setLanguageID}
        />
        <Button
          onClick={runCode}
          className="bg-blue-600 dark:text-white hover:bg-blue-400 flex gap-2"
        >
          Run Code
          <Play width={20} />
        </Button>
      </div>
      <div>
        <Editor
          className=" border border-blue-800"
          theme={editorTheme ? "light" : "vs-dark"}
          height="74vh"
          value={code}
          language={language}
          onChange={(value) => setCode(value || "")}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
