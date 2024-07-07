import React, { useEffect, useState } from 'react';
import Btn from '../Btn';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/authService';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
 const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getInitials = (fullName) => {
    let nameParts = fullName.split(' ');
    let initials = nameParts.map(name => name.charAt(0)).join('');
    return initials.toUpperCase();
  };

  if (!userData) {
    return null; // Or you can return a loading spinner
  }

  return (
    <div className="flex items-center p-4">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full text-white font-bold">
        {getInitials(userData.name)}
      </div>
      <div className="ml-4">
        <div className="text-gray-900 font-semibold">{userData.name}</div>
        <div className="text-gray-900 text-sm">{userData.email}</div>
      </div>
      <Btn onClick={handleLogout} className="ml-auto text-blue-600">Logout</Btn>
    </div>
  );
}

export default LogoutBtn;
