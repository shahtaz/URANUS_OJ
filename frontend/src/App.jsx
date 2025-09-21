import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import View from './pages/View'
import Unauthorized from './pages/Unauthorized'
import CreateProblem from './pages/CreateProblem'
import ProblemDelete from './pages/ProblemDelete'
import AdminRoute from './components/AdminRoute'
import UpdateProblemPage from './pages/UpdateProblemPage'
const App = () => {
  return (
    <div>
       <ToastContainer/>
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/email-verify' element={<EmailVerify/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />


          {/* extra */}
          <Route path='/unauthorized' element={<Unauthorized />} />


          {/* admin_route */}
          <Route 
            path='/admin/view' 
            element={
              <AdminRoute>
                <View/>
              </AdminRoute>
            }
          />
          <Route 
            path='/admin/create-problem' 
            element={
              <AdminRoute>
                <CreateProblem />
              </AdminRoute>
            }
          />
          <Route 
            path='/admin/update-problem/:id' 
            element={
              <AdminRoute>
                <UpdateProblemPage />
              </AdminRoute>
            }
          />
          <Route 
            path='/admin/delete-problem/:id' 
            element={
              <AdminRoute>
                <ProblemDelete />
              </AdminRoute>
            }
          />
        </Routes>
    
    </div>
  )
}

export default App