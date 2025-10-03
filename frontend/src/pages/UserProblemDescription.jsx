import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Navbar from "../components/Navbar";

const languages = ["C", "C++", "Java", "Python"];

const languageMap = {
  C: "c",
  "C++": "cpp",
  Java: "java",
  Python: "python",
};

const UserProblemDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Not Tried");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/problem/view/${id}`);
        setProblem(res.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleRunCode = async () => {
    try {
      setStatus("Running...");
      const res = await axios.post(`http://localhost:4000/api/run`, {
        language: selectedLanguage,
        code,
        input,
      });
      setOutput(res.data.output);
      setStatus(res.data.status);
    } catch (err) {
      setOutput(err.response?.data?.message || "Error running code");
      setStatus("Error");
    }
  };

  const handleSubmitCode = async () => {
    try {
      setStatus("Submitting...");
      const res = await axios.post(`http://localhost:4000/api/problem/submit/${id}`, {
        language: selectedLanguage,
        code,
        input,
      });
      setOutput(res.data.output);
      setStatus(res.data.status);
      alert("Code submitted successfully!");
    } catch (err) {
      setOutput(err.response?.data?.message || "Error submitting code");
      setStatus("Error");
    }
  };

  if (loading) return <div className="text-center py-10 text-black">Loading...</div>;
  if (!problem) return <div className="text-center py-10 text-black">Problem not found</div>;

  return (
    <div className="min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center text-black pt-20 pb-20">
      {/* Navbar */}
      <Navbar className="bg-transparent fixed w-full z-50" />

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-8 gap-6 px-4">
        {/* Left: Problem Description */}
        <div className="flex-1">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded font-semibold"
          >
            ← Back
          </button>
          <hr />

          <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
          <p className="text-sm mb-4">
            Difficulty:{" "}
            <span
              className={`font-semibold ${
                problem.difficulty === "Hard"
                  ? "text-red-600"
                  : problem.difficulty === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {problem.difficulty}
            </span>
          </p>
          <p className="mb-4">{problem.description}</p>

          <h2 className="text-xl font-semibold mb-2">Sample Test Cases</h2>
          {problem.sampleTestCases.map((tc, idx) => (
            <div key={idx} className="mb-3 p-2 border border-black/30 rounded">
              <p>
                <strong>Input:</strong> {tc.input}
              </p>
              <p>
                <strong>Output:</strong> {tc.output}
              </p>
              {tc.explanation && (
                <p>
                  <strong>Explanation:</strong> {tc.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right: Online IDE */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Status */}
          <div
            className="p-2 rounded font-semibold text-center text-white"
            style={{
              backgroundColor:
                status === "Accepted"
                  ? "green"
                  : status === "Error"
                  ? "red"
                  : status === "Running..."
                  ? "blue"
                  : "gray",
            }}
          >
            {status}
          </div>

          {/* Language Selector */}
          <select
            className="border rounded p-2 bg-black text-white"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang, idx) => (
              <option key={idx} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* Monaco Editor */}
          <Editor
            height="500px"
            defaultLanguage={languageMap[selectedLanguage]}
            language={languageMap[selectedLanguage]}
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />

          {/* Input & Output Boxes */}
          <div className="flex gap-4">
            <textarea
              className="flex-1 border rounded p-2 h-32 font-mono text-sm bg-black text-white"
              placeholder="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <textarea
              className="flex-1 border rounded p-2 h-32 font-mono text-sm bg-black/30 text-white"
              placeholder="Output"
              value={output}
              readOnly
            />
          </div>

          {/* Run & Submit Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
              onClick={handleRunCode}
            >
              Run Code
            </button>
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
              onClick={handleSubmitCode}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProblemDescription;
