import { useEffect, useState } from "react";

interface CodeOutputProps {
  codeToken: string;
  setCodeInput: (codeInput: string) => void;
}

const decodeBase64 = (data: string) => {
  try {
    return atob(data);
  } catch (error) {
    return "Error decoding base64 output";
  }
};

const CodeOutput = ({ codeToken, setCodeInput }: CodeOutputProps) => {
  const [output, setOutput] = useState("");

  const fetchResult = async (codeToken: string) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${codeToken}?base64_encoded=true&fields=*`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };

    try {
      const res = await fetch(url, options);
      const result = await res.text();
      const data = JSON.parse(result);

      return data;
    } catch (error) {
      return error;
    }
  };
  const polling = async (codeToken: string) => {
    let statusRes;

    do {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      statusRes = await fetchResult(codeToken);
    } while (statusRes.status.id === 1);

    return statusRes;
  };

  const handleExecution = async (codeToken: string) => {
    setOutput("Computing...");
    const res = await polling(codeToken);
    // console.log(res);

    if (res.status.id === 3) {
      setOutput(decodeBase64(res.stdout));
    } else {
      const description = res.status.description;
      const errMessage = (res.stderr ? atob(res.stderr) : "");

      setOutput(description + "\n" + errMessage);
    }
  };

  useEffect(() => {
    if (codeToken !== "") {
      handleExecution(codeToken);
    }
  }, [codeToken]);

  return (

    <div className="h-full flex justify-between flex-col gap-1">
      <div className="flex-1">
        <textarea
          style={{ outline: "none" }}
          className="w-full h-full border border-blue-800 p-3"
          placeholder="Enter your input here..."
          onChange={(e) => setCodeInput(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <textarea
          style={{ outline: "none" }}
          className="w-full h-full border border-blue-800 p-3"
          placeholder="Output..."
          value={output}
          onChange={(e) => {setOutput(e.target.value)}}
        />
      </div>
    </div>
  );
};

export default CodeOutput;
