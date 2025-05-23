import { Label } from "@headlessui/react";
import { usePage } from "@inertiajs/inertia-react";

export default function TeamSizeSelect({ value, onChange, className = "" }) {
    const teamSizeOptions = [
        { value: "Small", label: "1-10 Employees" },
        { value: "Medium", label: "11-50 Employees" },
        { value: "Large", label: "51-n Employees" },
    ];

    return (
        // Updated TeamSizeSelect.jsx with better styling
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 cursor-pointer"
            >
                {teamSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
