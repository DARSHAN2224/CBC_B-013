import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { error, isLoading, verifyEmail } = useAuthStore();

    // Handle digit input or paste
    const handleChange = (index, value) => {
        const newCode = [...code];

        // If user pastes the entire code
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move to next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Backspace to previous field if empty
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Submit form with 6-digit code
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");

        try {
            const response = await verifyEmail(verificationCode);
            toast.success(response.message);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    // Auto-submit when all 6 digits are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Verify Your Email
                </h2>

                <p className="text-center text-gray-300 mb-6">
                    Enter the 6-digit code sent to your email address.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="6"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-red-500 font-semibold mt-2 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
