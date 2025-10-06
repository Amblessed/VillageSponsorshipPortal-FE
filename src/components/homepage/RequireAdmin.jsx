import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAdmin = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'ADMIN' ? children : <Navigate to="/" />;
};


export default RequireAdmin;
