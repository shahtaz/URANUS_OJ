import React from 'react'
import { Link  } from "react-router-dom"
import { PlusIcon } from "lucide-react"

const AdminNav = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Admin Dashboard</h1>
          <div className='flex items-center gap-4'>
            <Link 
              to={"/admin/problemset-create"} 
              className='btn btn-primary flex items-center gap-2 border border-primary p-3 bg-gray-200'
            >
              <PlusIcon className='w-5 h-5' />
              <span>New Problem</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNav
