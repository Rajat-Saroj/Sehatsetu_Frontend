import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaFire, FaBookOpen, FaTrophy, FaSignOutAlt, FaPlayCircle } from 'react-icons/fa';
import { logout, reset } from '../features/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Top Navigation Bar */}
      <div className="bg-green-800 text-white shadow-md">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold italic">SehatSetu</h1>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg font-bold transition"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-10">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-green-700">{user.firstName}</span>! 👋
          </h1>
          <p className="text-xl text-gray-600">Ready to continue your wellness journey today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="bg-orange-100 p-4 rounded-full text-orange-500 text-3xl">
              <FaFire />
            </div>
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Current Streak</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{user.streak || 0} Days</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="bg-blue-100 p-4 rounded-full text-blue-500 text-3xl">
              <FaBookOpen />
            </div>
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Active Programs</p>
              <h3 className="text-3xl font-extrabold text-gray-900">
                {user.purchasedPrograms ? user.purchasedPrograms.length : 0}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="bg-yellow-100 p-4 rounded-full text-yellow-600 text-3xl">
              <FaTrophy />
            </div>
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Achievements</p>
              <h3 className="text-3xl font-extrabold text-gray-900">Level 1</h3>
            </div>
          </div>
        </div>

        {/* My Programs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Programs</h2>
            {/* 👇 FIX 1: Pointing exactly to /catalogue 👇 */}
            <Link to="/catalogue" className="text-green-700 font-bold hover:underline">
              Browse Catalog &rarr;
            </Link>
          </div>

          {user.purchasedPrograms && user.purchasedPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* 👇 FIX 2: Mapping through your actual purchased programs 👇 */}
              {user.purchasedPrograms.map((program, index) => {
                // Handle case where populate might just return an ID string initially
                const isObject = typeof program === 'object' && program !== null;
                const programId = isObject ? program._id : program;
                const programTitle = isObject && program.title ? program.title : `Enrolled Program ${index + 1}`;
                const programImage = isObject && program.image ? program.image : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80";

                return (
                  <div key={programId} className="border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
                    <div className="h-40 relative">
                      <img src={programImage} alt={programTitle} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">{programTitle}</h3>
                      <div className="mt-auto">
                        <Link 
                          to={`/view-course/${programId}`} 
                          className="flex items-center justify-center gap-2 w-full bg-green-100 text-green-800 font-bold py-2 rounded-lg hover:bg-green-200 transition"
                        >
                          <FaPlayCircle /> Resume Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <FaBookOpen className="mx-auto text-4xl text-gray-400 mb-3" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No active programs yet</h3>
              <p className="text-gray-500 mb-4">Start your first wellness program today to build strength and balance.</p>
              {/* 👇 FIX 1: Pointing exactly to /catalogue 👇 */}
              <Link to="/catalogue" className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition inline-block">
                Explore Programs
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;