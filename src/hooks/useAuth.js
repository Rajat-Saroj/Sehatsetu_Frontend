import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';
  
  return { user, token, loading, error, isAdmin, isInstructor };
};

export default useAuth;