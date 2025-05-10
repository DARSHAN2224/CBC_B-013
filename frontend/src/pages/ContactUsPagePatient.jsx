import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
const ContactUsPagePatient = () => {
    const {sendContactus}=useAuthStore();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendContactus(email,message);
        toast.success("Your message has been sent!");
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-900  text-white">
                <div className="w-full max-w-md p-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUsPagePatient;
