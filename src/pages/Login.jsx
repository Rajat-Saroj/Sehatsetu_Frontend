import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Added Link here
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-16">
        
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-green-900 mb-4 leading-tight">
            Welcome Back to <span className="text-green-600 font-extrabold italic">SehatSetu</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Log in to continue your wellness journey.
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
            
            <div>
              <label className="mb-2 block text-lg font-bold text-gray-900">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none bg-gray-50"
              />
            </div>

            <div className="w-full relative">
              <label className="mb-2 block text-lg font-bold text-gray-900">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none bg-gray-50"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[58px] cursor-pointer text-gray-500 text-2xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* 👇 NEW: Forgot Password Link tucked nicely under the password box 👇 */}
            <div className="flex justify-end -mt-2">
              <Link to="/forgot-password" className="text-green-700 font-bold hover:underline text-md">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full bg-yellow-400 text-gray-900 font-extrabold text-xl py-4 rounded-lg hover:bg-yellow-500 transition shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            
            {/* 👇 NEW: Back to Signup link just to keep the flow smooth 👇 */}
            <p className="text-center text-gray-600 mt-4 text-lg">
              Don't have an account? <Link to="/signup" className="text-green-700 font-bold hover:underline">Sign up</Link>
            </p>

          </form>
        </div>

        <div className="w-full md:w-1/2 relative">
          <img 
             src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"
             alt="Senior Wellness"
             className="w-full rounded-2xl shadow-2xl relative z-10"
          />
          <div className="absolute top-4 -right-4 w-full h-full bg-green-100 rounded-2xl -z-0"></div>
        </div>

      </div>
    </div>
  );
};

export default Login;