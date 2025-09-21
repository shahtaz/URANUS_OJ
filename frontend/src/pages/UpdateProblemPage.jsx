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
    sampleTestCases: '',
    hiddenTestCases: '',
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
          sampleTestCases: JSON.stringify(res.data.sampleTestCases, null, 2),
          hiddenTestCases: JSON.stringify(res.data.hiddenTestCases, null, 2),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/problem/update/${id}`, {
        ...problem,
        sampleTestCases: JSON.parse(problem.sampleTestCases),
        hiddenTestCases: JSON.parse(problem.hiddenTestCases),
      });
      alert('Problem updated successfully');
      navigate('/admin/view');
    } catch (err) {
      console.error(err);
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
        <label htmlFor="">problem name</label>
      <input
        type="text"
        name="title"
        value={problem.title}
        onChange={handleChange}
        placeholder="Title"
        className="border px-4 py-4 rounded w-full text-xl"
      />
        <label htmlFor="">problem description</label>

      <textarea
        name="description"
        value={problem.description}
        onChange={handleChange}
        placeholder="Description"
        className="border px-4 py-4 rounded w-full text-xl"
        rows={6}
      />
        <label htmlFor=""> input format</label>

      <textarea
        name="inputFormat"
        value={problem.inputFormat}
        onChange={handleChange}
        placeholder="Input Format"
        className="border px-4 py-4 rounded w-full text-xl"
        rows={4}
      />
        <label htmlFor="">output format</label>

      <textarea
        name="outputFormat"
        value={problem.outputFormat}
        onChange={handleChange}
        placeholder="Output Format"
        className="border px-4 py-4 rounded w-full text-xl"
        rows={4}
      />
        <label htmlFor="">sample testcase</label>

      <textarea
        name="sampleTestCases"
        value={problem.sampleTestCases}
        onChange={handleChange}
        placeholder="Sample Test Cases (JSON)"
        className="border px-4 py-4 rounded w-full text-xl font-mono"
        rows={6}
      />
        <label htmlFor=""> hidden test case</label>
      
      <textarea
        name="hiddenTestCases"
        value={problem.hiddenTestCases}
        onChange={handleChange}
        placeholder="Hidden Test Cases (JSON)"
        className="border px-4 py-4 rounded w-full text-xl font-mono"
        rows={6}
      />
<select
  name="difficulty"
  value={problem.difficulty}
  onChange={handleChange}
  className="w-full px-4 py-3 text-xl border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Difficulty</option>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
</select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-blue-600 text-xl"
      >
        Update Problem
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateProblemPage;
