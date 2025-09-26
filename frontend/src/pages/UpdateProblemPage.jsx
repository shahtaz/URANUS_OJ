import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../components/AdminNav';

const UpdateProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    sampleTestCases: [{ input: '', output: '', explanation: '' }],
    hiddenTestCases: [{ input: '', output: '' }],
    difficulty: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/problem/view/${id}`);
        setProblem({
          title: res.data.title,
          description: res.data.description,
          inputFormat: res.data.inputFormat,
          outputFormat: res.data.outputFormat,
          sampleTestCases: res.data.sampleTestCases.length
            ? res.data.sampleTestCases
            : [{ input: '', output: '', explanation: '' }],
          hiddenTestCases: res.data.hiddenTestCases.length
            ? res.data.hiddenTestCases
            : [{ input: '', output: '' }],
          difficulty: res.data.difficulty,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (type, index, field, value) => {
    const updated = [...problem[type]];
    updated[index][field] = value;
    setProblem({ ...problem, [type]: updated });
  };

  const addTestCase = (type) => {
    const newCase =
      type === 'sampleTestCases'
        ? { input: '', output: '', explanation: '' }
        : { input: '', output: '' };
    setProblem({ ...problem, [type]: [...problem[type], newCase] });
  };

  const removeTestCase = (type, index) => {
    const updated = [...problem[type]];
    updated.splice(index, 1);
    setProblem({ ...problem, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove empty test cases
      const validSampleTestCases = problem.sampleTestCases.filter(
        (tc) => tc.input.trim() && tc.output.trim()
      );
      const validHiddenTestCases = problem.hiddenTestCases.filter(
        (tc) => tc.input.trim() && tc.output.trim()
      );

      // Correct difficulty casing
      const difficulty =
        problem.difficulty.charAt(0).toUpperCase() +
        problem.difficulty.slice(1).toLowerCase();

      await axios.put(`http://localhost:4000/api/problem/edit/${id}`, {
        ...problem,
        sampleTestCases: validSampleTestCases,
        hiddenTestCases: validHiddenTestCases,
        difficulty,
      });

      alert('Problem updated successfully');
      navigate('/admin/view');
    } catch (err) {
      console.error('Update error:', err.response || err);
      alert('Failed to update problem');
    }
  };

  if (loading) return <p className="text-center mt-6">Loading problem...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Problem</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <label>Problem Name</label>
          <input
            type="text"
            name="title"
            value={problem.title}
            onChange={handleChange}
            className="border px-4 py-2 rounded text-lg"
          />

          <label>Problem Description</label>
          <textarea
            name="description"
            value={problem.description}
            onChange={handleChange}
            className="border px-4 py-2 rounded text-lg"
            rows={5}
          />

          <label>Input Format</label>
          <textarea
            name="inputFormat"
            value={problem.inputFormat}
            onChange={handleChange}
            className="border px-4 py-2 rounded text-lg"
            rows={3}
          />

          <label>Output Format</label>
          <textarea
            name="outputFormat"
            value={problem.outputFormat}
            onChange={handleChange}
            className="border px-4 py-2 rounded text-lg"
            rows={3}
          />

          {/* Sample Test Cases */}
          <h2 className="text-xl font-semibold mt-4">Sample Test Cases</h2>
          {problem.sampleTestCases.map((tc, i) => (
            <div key={i} className="border p-4 rounded mb-2 relative">
              <input
                type="text"
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestCaseChange('sampleTestCases', i, 'input', e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestCaseChange('sampleTestCases', i, 'output', e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Explanation"
                value={tc.explanation}
                onChange={(e) =>
                  handleTestCaseChange('sampleTestCases', i, 'explanation', e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <button
                type="button"
                onClick={() => removeTestCase('sampleTestCases', i)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTestCase('sampleTestCases')}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            + Add Sample Test Case
          </button>

          {/* Hidden Test Cases */}
          <h2 className="text-xl font-semibold mt-4">Hidden Test Cases</h2>
          {problem.hiddenTestCases.map((tc, i) => (
            <div key={i} className="border p-4 rounded mb-2 relative">
              <input
                type="text"
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestCaseChange('hiddenTestCases', i, 'input', e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestCaseChange('hiddenTestCases', i, 'output', e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <button
                type="button"
                onClick={() => removeTestCase('hiddenTestCases', i)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTestCase('hiddenTestCases')}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            + Add Hidden Test Case
          </button>

          <label className="mt-4">Difficulty</label>
          <select
            name="difficulty"
            value={problem.difficulty}
            onChange={handleChange}
            className="border px-4 py-2 rounded text-lg"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg mt-4"
          >
            Update Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProblemPage;
