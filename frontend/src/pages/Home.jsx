import React, { useState, useEffect } from 'react';
import NavbarDoctor from '../components/NavbarDoctor';
import Footer from '../components/Footer';
import PatientInfo from '../components/PatientInfo';
import { useAuthStore } from '../store/authStore';
const HomePage = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const {getPatientsByDoctor}=useAuthStore()
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      const patients = await getPatientsByDoctor(); // Pass doctorId here
      console.log(patients);
      
      setPatientDetails(patients); // Update state with fetched patient data
      setIsLoading(false);
    };

    fetchPatients();
  }, [1000]); // Fetch data whenever doctorId changes

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <NavbarDoctor />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Patient Details
        </h2>
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center text-xl">Loading...</div>
          ) : (
            patientDetails.map((patient, index) => (
              <PatientInfo key={index} patient={patient} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
