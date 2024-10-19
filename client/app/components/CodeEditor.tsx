"use client";

import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, Moon, Play, Sun } from "lucide-react";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CodeEditorProps {
  setCodeToken: (codeToken: string) => void;
  codeInput: string;
}

const CodeEditor = ({ setCodeToken, codeInput }: CodeEditorProps) => {
  const [socket, setSocket] = useState<any>(undefined);
  const [editorTheme, setEditorTheme] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [languageID, setLanguageID] = useState(102);
  const [otherRoomID, setOtherRoomID] = useState("");
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
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

  const handleEditorChange = (value: any) => {
    if (roomID !== "") {
      socket.emit("editorChange", value);
    }
  };

  const runCode = async () => {
    console.log(codeInput);

    const url =
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";
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

  const joinRoom = (e: any) => {
    e.preventDefault();

    if (otherRoomID && username) {
      toast.success(`Joined Room ${otherRoomID}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(`Enter room ID and username`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setRoomID(otherRoomID);

    socket.emit("joinRoom", { otherRoomID, username });
  };
  const exitRoom = (e: any) => {
    e.preventDefault();

    socket.emit("leaveRoom", { username, roomID });
    toast.info(`Left Room ${otherRoomID}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setRoomID("");
  };

  useEffect(() => {
    // const socket = io("http://localhost:8000/");
    const socket = io("https://project-tle.onrender.com");

    socket.on("connect", () => {
      console.log("Connected to the server with ID:", socket.id);
    });

    socket.on("editorChange", (data) => {
      setCode(data);
    });
    socket.on("joinMessage", ({ username, otherRoomID }) => {
      toast(`${username} joined room ${otherRoomID}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
    socket.on("leaveMessage", ({ username, roomID }) => {
      toast(`${username} left room ${roomID}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex items-center justify-between mb-2 gap-2">
        {!roomID ? (
          <div className="flex gap-1 xl:flex-row flex-col">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <Input
              value={otherRoomID}
              onChange={(e) => setOtherRoomID(e.target.value)}
              placeholder="Enter Room ID"
            />
            <Button
              onClick={(e) => joinRoom(e)}
              className="bg-green-600 text-white hover:bg-green-500"
            >
              Enter Room
            </Button>
          </div>
        ) : (
          <Button
            onClick={(e) => exitRoom(e)}
            className="flex gap-2 bg-red-600 text-white hover:bg-red-500"
          >
            <ArrowLeftFromLine size={20} />
            Exit Room
          </Button>
        )}
        <div className="flex gap-1 xl:flex-row flex-col">
          <Button
            variant="outline"
            onClick={() => setEditorTheme(!editorTheme)}
          >
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
      </div>
      <div>
        <Editor
          className=" border border-blue-800"
          theme={editorTheme ? "light" : "vs-dark"}
          height="74vh"
          
          value={code}
          language={language}
          onChange={(value) => handleEditorChange(value)}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
