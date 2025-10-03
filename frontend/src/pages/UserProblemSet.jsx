import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/problem/view");
        setProblems(res.data);
      } catch (error) {
        console.log("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className='min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Add padding-top so content doesn't overlap the navbar */}
      <div className="pt-24 flex flex-col items-center px-4">
        <div className="max-w-12xl w-full bg-white bg-opacity-0 p-6 rounded-xl ">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
            Problem Sets
          </h1>

          {loading && (
            <div className="text-center text-blue-500 py-10 text-lg">
              Loading problems...
            </div>
          )}

          {!loading && problems.length === 0 && (
            <div className="text-center text-gray-500 text-lg mt-10">
              No problem sets found
            </div>
          )}

          {!loading && problems.length > 0 && (
            <ul className="flex flex-col gap-4">
              {problems.map((problem, index) => (
                <li
                  key={problem._id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-6 py-4 shadow hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    navigate(`/user/problem-description/${problem._id}`)
                  }
                >
                  <span className="text-gray-800 font-medium">
                    {index + 1}. {problem.title}
                  </span>
                  <button className="px-4 py-1.5 bg-blue-400 text-black rounded-full hover:bg-blue-600 transition-all">
                    Solve
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProblemSet;
