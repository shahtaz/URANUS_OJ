import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContent);

  const handleGoBack = () => navigate(-1);

  const handleLogout = async () => {
    await logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800 min-h-screen">
      {/* Icon */}
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      {/* Message */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-1">You don't have permission to access this resource.</p>
      <p className="text-sm text-red-600 mb-6">Admin access required.</p>

      {/* User Info */}
      {userData && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          <p>
            Logged in as: <span className="font-semibold">{userData.email || userData.username || userData.name}</span>
          </p>
          <p>
            Role: <span className="font-semibold capitalize">{userData.role || 'user'}</span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={handleGoBack}
          className="w-full border border-gray-500 rounded-full px-6 py-2.5 hover:bg-gray-100 transition-all"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full border border-gray-500 rounded-full px-6 py-2.5 hover:bg-gray-100 transition-all"
        >
          Go to Home
        </button>

        {userData && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white rounded-full px-6 py-2.5 hover:bg-red-700 transition-all"
          >
            Logout & Login as Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
