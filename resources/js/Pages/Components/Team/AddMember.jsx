import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import axios from 'axios'; // Add axios

export default function AddMember({ onClose }) {
    const { data, setData, processing, errors, setError, reset } = useForm({
        email: "",
        name: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/plan/add/member', data);
            
            if (response.data.success) {
                reset();
                onClose();
            }
        } catch (error) {
            if (error.response.status === 422) {
                // Set Inertia errors manually
                setError(error.response.data.errors);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <input 
                            type="text" 
                            name="name" 
                            value={data.name} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required 
                        />
                        {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter teammate's email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Adding...' : 'Add Member'}
                    </button>
                </form>
            </div>
        </div>
    );
}