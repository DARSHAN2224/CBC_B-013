import React from 'react';

const PatientInfo = ({ patient }) => {
    return (
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300">Name:</h3>
                    <p className="text-gray-400">{patient.name}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300">Phone Number:</h3>
                    <p className="text-gray-400">{patient.mobile}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300">Email:</h3>
                    <p className="text-gray-400">{patient.email}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300">Symptoms:</h3>
                    <p className="text-gray-400">{patient.symptoms}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300">Disease Name:</h3>
                    <p className="text-gray-400">{patient.diseaseName}</p>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
