import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';

const ContactUsPagePatient = () => {
    const { sendContactus } = useAuthStore();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await sendContactus(email, message);
        setLoading(false);

        if (res.success) {
            toast.success(res.message || "Message sent successfully!");
            setEmail("");
            setMessage("");
        } else {
            toast.error(res.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-white-900 text-white">
                <div className="w-full max-w-md p-10 bg-white bg-opacity-50 backdrop-blur-2xl shadow-2xl rounded-2xl border border-blue border-opacity-10">

                    <h2 className="text-3xl font-bold mb-6text-center bg-gradient-to-r from-blue-700 to-emerald-500 text-transparent bg-clip-text">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-left text-blue-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 text-white border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-blue-700 mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 text-white border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUsPagePatient;
