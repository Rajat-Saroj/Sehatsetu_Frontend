import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/authSlice';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess) {
      alert("Account created! Check your email to verify before logging in.");
      navigate('/login');
    } else if (user && user.token) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");
    dispatch(register({ firstName, lastName, email, password, accountType: "user" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-white">
      <div className="max-w-md w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-green-900">Create Account</h1>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <input required name="firstName" value={firstName} onChange={handleOnChange} placeholder="First Name" className="p-3 border rounded" />
          <input required name="lastName" value={lastName} onChange={handleOnChange} placeholder="Last Name" className="p-3 border rounded" />
          <input required type="email" name="email" value={email} onChange={handleOnChange} placeholder="Email" className="p-3 border rounded" />
          <div className="relative">
            <input required type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange} placeholder="Password" className="w-full p-3 border rounded" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 cursor-pointer">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
          <div className="relative">
            <input required type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" className="w-full p-3 border rounded" />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-4 cursor-pointer">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-700 text-white p-3 rounded font-bold hover:bg-green-800">
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="text-green-700 font-bold">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;