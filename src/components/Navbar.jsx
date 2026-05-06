import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa'; // 👈 Added FaCog here
import { logout, reset } from '../features/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 🧠 THE BRAIN: Checking Redux to see if someone is logged in!
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-green-800 italic tracking-tight">
          SehatSetu
        </Link>

        {/* Center Links (Hidden on tiny mobile screens for now) */}
        <div className="hidden md:flex gap-8 items-center font-bold text-gray-600">
          <Link to="/" className="hover:text-green-700 transition">Home</Link>
          <Link to="/catalogue" className="hover:text-green-700 transition">Catalogue</Link>
          <Link to="/about" className="hover:text-green-700 transition">About</Link>
          <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>
        </div>

        {/* Right Side: Smart Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            // User IS logged in 👇
            <>
              {/* 👇 NEW: Admin Panel Button (Only shows if accountType is 'admin') 👇 */}
              {user.accountType === 'admin' && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition shadow-sm"
                >
                  <FaCog className="text-xl" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition shadow-sm"
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden sm:inline">My Dashboard</span>
              </Link>
              
              <button 
                onClick={onLogout} 
                className="text-gray-500 hover:text-red-600 transition p-2"
                title="Logout"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </>
          ) : (
            // User is NOT logged in 👇
            <>
              <Link to="/login" className="text-green-700 font-bold hover:underline px-2">
                Log In
              </Link>
              <Link to="/signup" className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-extrabold hover:bg-yellow-500 transition shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;