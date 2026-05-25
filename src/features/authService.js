import axios from 'axios';

const API_URL = 'https://sehatsetu-api.onrender.com/api/auth/';

const register = async (userData) => {
  // This correctly resolves to: https://sehatsetu-api.onrender.com/api/auth/signup
  const response = await axios.post(API_URL + 'signup', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  // This correctly resolves to: https://sehatsetu-api.onrender.com/api/auth/login
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;