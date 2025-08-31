import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Plus, X } from "lucide-react";

function InputDialog({ value, errors, loggedInUser }) {
    const { team } = usePage().props;
    

    const { data, setData, post, processing, reset } = useForm({
        member_id: loggedInUser,
        team_id: team.id,
        task_name: "",
        task_description: "",
        selected_date: value,
    });

    console.log("logged in:", loggedInUser);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/team-tasks", {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="task_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Task Title *
                    </label>
                    <input
                        type="text"
                        name="task_name"
                        id="task_name"
                        value={data.task_name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.task_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter task name"
                        required
                        autoFocus
                    />
                    {errors.task_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.task_name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="task_description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="task_description"
                        id="task_description"
                        value={data.task_description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.task_description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Add details about this task..."
                    />
                    {errors.task_description && (
                        <p className="mt-1 text-sm text-red-600">{errors.task_description}</p>
                    )}
                </div>

                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg">
                    <p>This task will be created for <strong>{value}</strong></p>
                </div>

                
                <input type="hidden" name="selected_date" value={data.selected_date} />

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-200 hover:bg-gray-400 transition-colors"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex text-sm items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus size={12} className="mr-2" />
                                Create Task
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InputDialog;