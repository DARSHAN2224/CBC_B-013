import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PatientProblemsUpdate = () => {
  const navigate = useNavigate();
  const { patientProblem,fetchDoctorsByDisease, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    doctorToConsult: "",
    diseaseName: "",
    symptoms: "",
    bookingDate: "", // Added for booking date
  });

  // State for auto-suggested doctors
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "diseaseName" && value.length > 0) {
      // Call the search doctor API when disease name is typed
      fetchDoctorsByDisease(value).then((doctors) => {
        setSuggestedDoctors(doctors); // Update the suggested doctors
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctorToConsult, diseaseName, symptoms, bookingDate } = formData;

    // Assuming you have an API to update patient problems
    await patientProblem(doctorToConsult, diseaseName, symptoms, bookingDate);
    navigate("/"); // Navigate to the doctor dashboard
  };

  useEffect(() => {
    // Disable the button until the booking date
    const currentDate = new Date();
    const appointmentDate = new Date(formData.bookingDate);
    if (appointmentDate > currentDate) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [formData.bookingDate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form
          className="w-full max-w-md p-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            Update Patient Problems
          </h2>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="doctorToConsult">
              Doctor to Consult:
            </label>
            <input
              type="text"
              id="doctorToConsult"
              name="doctorToConsult"
              value={formData.doctorToConsult}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="diseaseName">
              Disease Name:
            </label>
            <input
              type="text"
              id="diseaseName"
              name="diseaseName"
              value={formData.diseaseName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            />
            {/* Render suggested doctors */}
            {suggestedDoctors.length > 0 && (
              <div className="mt-2 bg-gray-700 rounded-md shadow-lg">
                {suggestedDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer"
                    onClick={() => setFormData({ ...formData, doctorToConsult: doctor.name })}
                  >
                    {doctor.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="symptoms">
              Symptoms:
            </label>
            <input
              type="text"
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="bookingDate">
              Booking Date:
            </label>
            <input
              type="datetime-local"
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            />
          </div>
          {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Update Problems"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PatientProblemsUpdate;
