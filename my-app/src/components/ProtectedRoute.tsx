import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoute: React.FC<{
  path: string;
  element: React.ReactElement;
}> = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('ProtectedRoute must be used within an AuthProvider');
  }

  const { user } = authContext;

  if (!user) {
    navigate('/login');
    return <Route path="*" element={<Navigate to="/login" />} />;
  }

  return <Route path={props.path} element={props.element} />;
};

export default ProtectedRoute;