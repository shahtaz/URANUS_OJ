// STEP 1: Update your existing AppContext
// AppContext.js (or wherever your context file is)
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    const [authLoading, setAuthLoading] = useState(true) // Add loading state

    const getAuthState = async () => {
        try {
            setAuthLoading(true) // Set loading to true
            const { data } = await axios.post(backendUrl + '/api/auth/is-auth')

            if (data.success) {
                setIsLoggedin(true)
                await getUserData() // Wait for user data
            }
        } catch (error) {
            toast.error(error.message)
            setIsLoggedin(false)
            setUserData(false)
        } finally {
            setAuthLoading(false) // Set loading to false
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
                setUserData(false)
            }
        } catch (error) {
            toast.error(error.message)
            setUserData(false)
        }
    }

    // Add helper functions for admin checks
    const isAdmin = () => {
        return userData && userData.role === 'admin'
    }

    const isAuthenticated = () => {
        return isLoggedin && userData
    }

    // Logout function
    const logout = async () => {
        try {
            // Call your logout API if you have one
            await axios.post(backendUrl + '/api/auth/logout')
            setIsLoggedin(false)
            setUserData(false)
            toast.success('Logged out successfully')
        } catch (error) {
            // Even if API fails, clear local state
            setIsLoggedin(false)
            setUserData(false)
            toast.error('Logout error: ' + error.message)
        }
    }

    useEffect(() => {
        getAuthState()
    }, [])

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        authLoading,        // Add loading state
        isAdmin,           // Add admin check function
        isAuthenticated,   // Add authentication check
        logout            // Add logout function
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}