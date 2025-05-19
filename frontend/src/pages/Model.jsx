import React, { useEffect } from 'react';
import { useMentalStore } from '../store/useMentalHealthStore.js';
import { useAuthStore } from "../store/authStore.js";
import Navbar from "../components/Navbar.jsx";
const Model = () => {
    const {
        inputData, questions, answers, suggestions, recommendations, isLoading,
        setInputValue, setAnswer, predict, storeAnswers, generateSuggestions, fetchRecommendations,prediction
    } = useMentalStore();

    const user = useAuthStore.getState().user;
    const userId = user?._id;

    useEffect(() => {
        if (!userId) {
            console.error("User ID not found. Make sure the user is authenticated.");
        }
    }, [userId]);

    const handlePredict = async () => await predict(inputData);
    const handleStoreAnswers = async () => await storeAnswers(userId, answers);
    const handleGenerateSuggestions = async () => await generateSuggestions(userId);
    const handleFetchRecommendations = async () => await fetchRecommendations(userId);

    const renderSection = (title, items) => (
        <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <ul className="space-y-4">
                {items.map((item, idx) => (
                    <li key={idx} className="bg-white shadow p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{item.title}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                Watch
                            </a>
                        </div>
                        {item.link.includes("youtube") && (
                            <div className="mt-4">
                                <iframe
                                    width="100%"
                                    height="250"
                                    src={item.link.replace("watch?v=", "embed/")}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title={item.title}
                                    className="rounded-lg"
                                ></iframe>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
        <Navbar getStarted = {false}/>
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">🧠 Mental Health Predictor</h2>

            <div className="bg-white rounded-xl shadow p-6 mb-10">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">📋 Input Your Data</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(inputData).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace('_', ' ')}:</label>
                            <input
                                type="number"
                                name={key}
                                value={value}
                                onChange={(e) => setInputValue(key, Number(e.target.value))}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handlePredict}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Predict Mental Health
                </button>
            </div>
                    <div className="bg-white rounded-xl shadow p-6 mb-10"> {prediction ? (<p className="font-bold text-black-200 mb-2">{prediction}</p>) : (<p>Loading prediction...</p> )}</div>
            {questions.length > 0 && (
                <div className="bg-white rounded-xl shadow p-6 mb-10">

                    <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Follow-up Questions</h3>
                   {questions.map((question, idx) => (
    <div key={idx} className="mb-4">
        <p className="mb-2 text-gray-700">{question}</p>
        {/* Show input only if the question does not contain 'Question about personal habits' or any other static text */}
        {!(question.includes("**Question about personal habits**") || question.includes("**10 Follow-up Questions:**")) && (
            <input
                type="text"
                onChange={(e) => setAnswer(idx, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
        )}
    </div>
))}

                    <button
                        onClick={handleStoreAnswers}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Store Answers
                    </button>
                </div>
            )}

          
               <div className="bg-white rounded-xl shadow p-6 mb-10">
    <button
        onClick={handleGenerateSuggestions}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition mb-4"
    >
        Generate Suggestions
    </button>
    <div className="bg-gray-100 p-4 rounded shadow-inner text-gray-800">
        <h4 className="font-semibold text-lg mb-2">📌 Suggestions:</h4>
        <div>
            {Array.isArray(suggestions) ? (
                suggestions.map((line, index) => (
                    <p key={index} className="mb-3">• {line}</p>  // Line space added
                ))
            ) : (
                <p>{suggestions}</p>
            )}
        </div>
    </div>
</div>

        

            {/* <div className="mb-10">
                <button
                    onClick={handleFetchRecommendations}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
                >
                    {isLoading ? 'Loading...' : 'Load Personalized Recommendations'}
                </button>
            </div> */}

            {recommendations && (
                <div className="bg-white rounded-xl shadow p-6">
                    {renderSection("🎵 Music", recommendations.music)}
                    {renderSection("😂 Comedy", recommendations.comedy)}
                    {renderSection("✈ Travel", recommendations.travel)}
                    {renderSection("🧘 Yoga & Meditation", recommendations.yoga)}
                </div>
            )}
        </div>
    </>
    );
};

export default Model;
