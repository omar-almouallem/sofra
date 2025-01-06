import React from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; 

}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
    const { role } = useAuth(); 
    const navigate = useNavigate();

  
  if (allowedRoles.includes(role)) {
    return <>{children}</>; 
  }
else return navigate('/unauthorized')
  
};

export default PrivateRoute;
