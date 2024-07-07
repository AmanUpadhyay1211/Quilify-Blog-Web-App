import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./redux/slices/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData && userData.email) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.log(err.message);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  
  return loading ? (
    <div className="loading w-[100vw] h-[100vh] flex justify-center items-center text-white bg-black font-bold text-3xl">
      Loading...
    </div>
  ) : (
    <>
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
