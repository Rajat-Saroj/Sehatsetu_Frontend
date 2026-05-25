import React, { useState, useEffect } from 'react'; // 👈 Added useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // 👈 Added useDispatch
import { logout, reset } from '../features/authSlice'; // 👈 Added actions

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 👇 THE FIX: If they click the email link, rip off the VIP wristband!
  useEffect(() => {
    dispatch(logout());
    dispatch(reset());
  }, [dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }
    
    setLoading(true);
    try {
      const { data } = await axios.put(`https://sehatsetu-api.onrender.com/api/auth/resetpassword/${token}`, { password });
      alert(data.message);
      navigate('/login'); 
    } catch (error) {
      alert(error.response?.data?.message || 'Token is invalid or expired.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-green-900 text-center">Create New Password</h1>
        <p className="text-gray-600 text-center">Your new password must be different from previous used passwords.</p>
        
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <label className="mb-2 block text-lg font-bold text-gray-900">New Password</label>
            <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none bg-gray-50" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[50px] cursor-pointer text-gray-500 text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <div className="relative mt-2">
            <label className="mb-2 block text-lg font-bold text-gray-900">Confirm New Password</label>
            <input required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none bg-gray-50" />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-[50px] cursor-pointer text-gray-500 text-2xl">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
          
          <button type="submit" disabled={loading} className="mt-6 w-full bg-green-700 text-white font-extrabold text-xl py-4 rounded-lg hover:bg-green-800 transition shadow-lg disabled:opacity-50">
            {loading ? 'Saving...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;