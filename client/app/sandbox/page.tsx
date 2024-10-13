"use client";

import React, { useState, useRef } from "react";
import CodeEditor from "../components/CodeEditor";
import CodeOutput from "../components/CodeOutput";

const Sandbox = () => {
  const [codeToken, setCodeToken] = useState("");  
  const [codeInput, setCodeInput] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-6 h-full">
      <div className="col-span-1 md:col-span-3">
        <CodeEditor setCodeToken={setCodeToken} codeInput={codeInput} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <CodeOutput codeToken={codeToken} setCodeInput={setCodeInput} />
      </div>
    </div>
  );
};

export default Sandbox;
