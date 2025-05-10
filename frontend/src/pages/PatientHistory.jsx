import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const PatientDetails = () => {
  const navigate = useNavigate();
  const { user, isLoading, error } = useAuthStore();
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    // Assuming the user is logged in and patient details are fetched from the server
    if (user) {
      setPatientDetails(user.patientDetails); // Assuming patientDetails is part of the logged-in user data
    } else {
      navigate("/login"); // Redirect if user is not logged in
    }
  }, [user, navigate]);

  return (<>
 <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Patient Details
        </h2>
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : error ? (
          <p className="text-red-500 font-semibold mb-4">{error}</p>
        ) : (
          <>
            {patientDetails && patientDetails.length > 0 ? (
              patientDetails.map((detail, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl text-white mb-4">Consultation {index + 1}</h3>
                  <div className="text-gray-300">
                    <p><strong>Doctor to Consult:</strong> {detail.doctorToConsult}</p>
                    <p><strong>Disease Name:</strong> {detail.diseaseName}</p>
                    <p><strong>Symptoms:</strong> {detail.symptoms}</p>
                    <p><strong>Booking Date:</strong> {new Date(detail.bookingDate).toLocaleString()}</p>
                  </div>
                  <hr className="my-4 border-gray-600" />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No patient details available</p>
            )}
          </>
        )}
        <div className="mt-4 text-center">
          <Link
            to="/patient/update"
            className="text-sm text-green-400 hover:underline"
          >
            Update Patient Details
          </Link>
        </div>
        <div className="px-8 py-4 mt-6 bg-gray-900 bg-opacity-50 flex justify-center rounded-md">
          <p className="text-sm text-gray-300">
            Need to log out?{" "}
            <Link to="/logout" className="text-green-400 hover:underline">
              Log out
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PatientDetails;
