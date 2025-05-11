import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import Navbar from "../components/Navbar";
import defaultImage from '../assets/image.png'; // Fallback image

const ProfilePage = () => {
  const { user, updateProfile, isLoading, error } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setPhone] = useState(user?.mobile || '');
  const [speciality, setSpeciality] = useState(user?.speciality || '');
  const [image, setImage] = useState(user?.image || '');
  const [previewImage, setPreviewImage] = useState(user?.image || defaultImage);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (typeof image === 'object') {
      const objectUrl = URL.createObjectURL(image);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage(image || defaultImage);
    }
  }, [image]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('speciality', speciality);
    formData.append('name', name);
    await updateProfile(formData);
    setIsEditMode(false);
    toast.success('Profile updated successfully!');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
    <Navbar getStarted={false} />
      <div className="min-h-screen flex items-center justify-center bg-white-900 text-white">
        <div className="w-full max-w-md p-10 bg-white-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
            Profile Page
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-300"
                />
              )}
            </div>

            {/* Form Fields */}
            {[
              { label: 'Name', value: name, set: setName },
              { label: 'Email', value: email, set: setEmail },
              { label: 'Phone', value: mobile, set: setPhone },
              
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className="block text-left text-blue-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-2 bg-gray-700 text-white border-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isEditMode ? 'border-gray-600' : 'border-transparent'
                  }`}
                />
              </div>
            ))}

            {/* Action Button */}
            <button
              type="button"
              onClick={isEditMode ? handleSave : () => setIsEditMode(true)}
              className={`w-full py-3 px-4 font-bold rounded-lg shadow-lg transition duration-200 ${
                isEditMode
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : isEditMode ? (
                'Save Changes'
              ) : (
                'Edit Profile'
              )}
            </button>
            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
