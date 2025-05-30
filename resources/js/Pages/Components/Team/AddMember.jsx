import React from "react";

export default function AddMember({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <div className="w-full flex justify-between mb-4">
                    <h2 className="text-xl font-bold text-center">
                        Add a Team Member
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <input
                    type="email"
                    placeholder="Enter teammate's email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Add Member
                </button>
            </div>
        </div>
    );
}
