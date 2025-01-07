import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducer/userSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('logout successfull')
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 rounded-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
        <a 
          href="#" 
          className="text-lg font-bold hover:text-gray-200 transition-colors"
        >
          URL Shortener
        </a>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-900"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;