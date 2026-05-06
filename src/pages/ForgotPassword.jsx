import React, { useState, useEffect } from 'react'; // 👈 Added useEffect
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // 👈 Added useDispatch
import { logout, reset } from '../features/authSlice'; // 👈 Added actions

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();

  // 👇 THE FIX: Clear any old login sessions immediately
  useEffect(() => {
    dispatch(logout());
    dispatch(reset());
  }, [dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/forgotpassword', { email });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-green-900 text-center">Reset Password</h1>
        <p className="text-gray-600 text-center">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className="p-3 bg-green-100 text-green-800 border border-green-300 rounded text-center font-bold">
            {message}
          </div>
        )}
        
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-lg font-bold text-gray-900">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none bg-gray-50" />
          </div>
          <button type="submit" disabled={loading} className="mt-4 w-full bg-yellow-400 text-gray-900 font-extrabold text-xl py-4 rounded-lg hover:bg-yellow-500 transition shadow-lg disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-2 text-lg">
          Remember your password? <Link to="/login" className="text-green-700 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;