import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaListAlt, FaUpload, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-10 border-b pb-6">
          <h1 className="text-4xl font-bold text-green-900">Admin Control Center</h1>
          <p className="text-lg text-gray-600 mt-2">
            Welcome back, {user?.firstName}. What would you like to manage today?
          </p>
        </div>

        {/* The Clickable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Create Course */}
          <Link 
            to="/admin/create-course" 
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-green-600 group flex flex-col items-center text-center"
          >
            <FaPlusCircle className="text-5xl text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Program</h2>
            <p className="text-gray-500">Add a new course title, description, and pricing.</p>
          </Link>

          {/* Card 2: Curriculum Builder */}
          <Link 
            to="/admin/build-curriculum" 
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-yellow-400 group flex flex-col items-center text-center"
          >
            <FaListAlt className="text-5xl text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Build Curriculum</h2>
            <p className="text-gray-500">Organize sections, lectures, and sub-topics.</p>
          </Link>

          {/* Card 3: Uploader (Placeholder for your other route) */}
          <Link 
            to="/admin/upload" 
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-500 group flex flex-col items-center text-center"
          >
            <FaUpload className="text-5xl text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Media</h2>
            <p className="text-gray-500">Upload videos, PDFs, and course assets.</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;