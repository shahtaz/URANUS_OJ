import React, { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/problem/view');
        setProblems(res.data);
      } catch (error) {
        console.log('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/problem/delete/${id}`);
      setProblems(problems.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading problems...
          </div>
        )}

        {problems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div
                key={problem._id}
                className="border rounded-xl p-4 shadow-md flex flex-col gap-3"
              >
                <h2 className="font-bold text-lg">{problem.title}</h2>
                <p className="text-sm text-gray-600">{problem.description}</p>

                <div className="flex gap-3 mt-3">
                <button
                  onClick={() => navigate(`/admin/update-problem/${problem._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>

                  <button
                    onClick={() => handleDelete(problem._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-500">No problems found</div>
          )
        )}
      </div>
    </div>
  );
};

export default View;
