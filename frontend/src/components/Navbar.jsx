import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <nav className="w-full bg-white text-gray-500 px-6 py-4 flex items-center justify-between  shadow-lg">
      
      
      <div className="text-2xl font-extrabold tracking-wide">
        Hello Dost
      </div>

      
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Hello, <span className="text-yellow-400">{user?.username || "Guest"}</span> 
        </h1>
        <p className="text-sm text-slate-300">
          {user?.email || "guest@gmail.com"}
        </p>
      </div>

 <div className="flex gap-3">
        <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl font-semibold">
          Profile
        </button>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl font-semibold">
          Logout
        </button>
      </div>
      
      
    <div className="">
      <img src="https://plus.unsplash.com/premium_vector-1719858611039-66c134efa74d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img.not" />
    </div>
    </nav>
  );
};

export default Navbar ; 