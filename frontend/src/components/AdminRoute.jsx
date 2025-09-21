import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext'; // Adjust path as needed

const AdminRoute = ({ children }) => {
    const { isLoggedin, userData, authLoading, isAdmin, isAuthenticated } = useContext(AppContent);

    // Show loading while checking auth status
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                <div className="ml-4 text-lg">Loading...</div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to unauthorized page if not admin
    if (!isAdmin()) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Render the protected component if user is admin
    return children;
};

export default AdminRoute;