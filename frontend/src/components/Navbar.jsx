import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore(); // Use the logout function from your store
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown
    const navigate=useNavigate()
    const handleLogout =async () => {
        await logout(); 
        navigate('/login')// Assuming your store has a logout method
        setIsDropdownOpen(false); // Close dropdown after logout
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
                    MyApp 222
                </h1>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-green-400">Home</Link>
                    <Link to="/history" className="hover:text-green-400">History</Link>
                    <Link to="/contactus" className="hover:text-green-400">Contact Us</Link>
                    <Link to="/profile" className="hover:text-green-400">Profile</Link>

                    {/* Conditionally render login/signup or dropdown for authenticated users */}
                    {!isAuthenticated ? (
                        <div className="inline-block relative">
                            <button
                                className="hover:text-green-400"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                Login / Signup
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-md">
                                    <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-600">Login</Link>
                                    <Link to="/signup" className="block px-4 py-2 text-white hover:bg-gray-600">Signup</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="inline-block relative">
                            <button
                                className="hover:text-green-400"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {user.name}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-md">
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-white hover:bg-gray-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
