import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import defaultImage from '../assets/image.png'; // Replace with your "No Image" placeholder path

const ProfilePagePatient = () => {
    const { user, updateProfile,isLoading,error } = useAuthStore();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobile, setPhone] = useState(user.mobile);
    const [image, setImage] = useState(user.image);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSave = async() => {
        const formData = new FormData();
        formData.append('image', image); // Ensure this is the file object, not the name
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('speciality', speciality);
        formData.append('name', name);
        await updateProfile(formData); // Update profile logic
        setIsEditMode(false); // Exit edit mode
        toast.success('Profile updated successfully!');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file,"iiii");
        
        if (file) {
                setImage(file); 
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="w-full max-w-md p-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Profile Page
                    </h2>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={defaultImage} alt="No Profile" className="w-full h-full object-cover" />
                                )}
                            </div>
                            {isEditMode && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="text-gray-300"
                                />
                            )}
                        </div>
                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full px-4 py-2 bg-gray-700 text-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isEditMode ? 'border-gray-600' : 'border-transparent'}`}
                            />
                        </div>
                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full px-4 py-2 bg-gray-700 text-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isEditMode ? 'border-gray-600' : 'border-transparent'}`}
                            />
                        </div>
                        {/* Phone Field */}
                        <div>
                            <label className="block text-gray-300 mb-2">Phone</label>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full px-4 py-2 bg-gray-700 text-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isEditMode ? 'border-gray-600' : 'border-transparent'}`}
                            />
                        </div>
                       
                        {/* Buttons */}
                        {isEditMode ? (
                            <button
                                type="button"
                                onClick={handleSave}
                                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg" disabled={isLoading}
                            >
                                {isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            " Save Changes"
          )}
                               
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditMode(true)}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg"
                            >
                                Edit Profile
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePagePatient;
