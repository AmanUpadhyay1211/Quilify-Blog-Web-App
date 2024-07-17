import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getInitials = (fullName) => {
    let nameParts = fullName.split(" ");
    let initials = nameParts.map((name) => name.charAt(0)).join("");
    return initials.toUpperCase();
  };

  if (!userData) {
    return null; // Or you can return a loading spinner
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
          {getInitials(userData.name)}
        </div>
        <div className="text-sm">
          <p className="text-white font-semibold">{userData.name}</p>
          <p className="text-gray-300">{userData.email}</p>
        </div>
      </div>
      <Btn onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
        Logout
      </Btn>
    </div>
  );
}

export default LogoutBtn;
