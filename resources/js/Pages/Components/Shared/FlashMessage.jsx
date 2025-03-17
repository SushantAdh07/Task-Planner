import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const FlashMessage = () => {
    const { flash } = usePage().props; // Single flash prop containing all messages
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.message) {
            setMessage(flash.message);
            const timer = setTimeout(() => setMessage(null), 5000); // Auto-hide after 5s
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!message) return null; // Hide if no message

    return (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-md p-4 border border-gray-300 flex items-center gap-4 animate-fade-in">
            <p className="text-gray-700">{message}</p>
            <button
                onClick={() => setMessage(null)}
                className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-md"
            >
                Okay
            </button>
        </div>
    );
};

export default FlashMessage;
