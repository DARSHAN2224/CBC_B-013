import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import defaultImage from '../assets/image.png';

const ProfilePagePatient = () => {
    const { user, updateProfile, isLoading } = useAuthStore();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobile, setPhone] = useState(user.mobile);
    const [image, setImage] = useState(user.image);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('name', name);

        try {
            await updateProfile(formData);
            toast.success('Profile updated successfully!');
            setIsEditMode(false);
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setImage(file);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-emerald-200 p-6">
                <div className="w-full max-w-lg p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300">
                    <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-8">
                        Patient Profile
                    </h2>

                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 shadow-md">
                            <img
                                src={
                                    typeof image === 'string'
                                        ? image
                                        : image instanceof File
                                        ? URL.createObjectURL(image)
                                        : defaultImage
                                }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isEditMode && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-4 text-sm text-gray-600"
                            />
                        )}
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                                    isEditMode ? 'border-gray-400' : 'border-transparent'
                                }`}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 ${
                                    isEditMode ? 'border-gray-400' : 'border-transparent'
                                }`}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditMode}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 ${
                                    isEditMode ? 'border-gray-400' : 'border-transparent'
                                }`}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="pt-4">
                            {isEditMode ? (
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:scale-105 transform transition duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditMode(true)}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transform transition duration-300"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePagePatient;
