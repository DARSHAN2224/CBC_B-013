import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SendEmailVerification = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const { isLoading, verify, error } = useAuthStore();

    // Show toast notification when error changes
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await verify(email);
        setIsSubmitted(true);
        navigate("/doctor/verify-email");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Verify Email
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className="text-gray-300 mb-6 text-center">
                                Enter your email address and we'll send you a link to verify your email.
                            </p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            />
                            <button
                                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="animate-spin mx-auto">🔄</span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="h-8 w-8 text-white">📧</span>
                            </div>
                            <p className="text-gray-300 mb-6">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>

                <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                    <Link to={"/login"} className="text-sm text-green-400 hover:underline flex items-center">
                        <span className="h-4 w-4 mr-2">←</span> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SendEmailVerification;
