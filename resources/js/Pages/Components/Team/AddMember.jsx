import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AddMember({ onClose, flash }) {
    

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        name: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/plan/add/member", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose(); // Close modal after success
            },
        });
    };

    useEffect(() => {
        if (flash.success) {
            alert(flash.success); // or use toast, or display inside modal
        }
    }, [flash.success]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg font-semibold">Invite Member</h2>

                    <div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter teammate's name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                            required
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter teammate's email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                            required
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border text-gray-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? "Sending..." : "Send Invite"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
