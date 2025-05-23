import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { X, Save, Check } from "lucide-react";

function EditDialog({ selectedTask, onClose }) {
    const { auth, errors } = usePage().props;

    const { data, setData, put, processing, reset } = useForm({
        user_id: auth.user.id,
        task_name: selectedTask.task_name,
        task_description: selectedTask.task_description,
        selected_date: selectedTask.selected_date,
        status: selectedTask.status || 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === "checkbox" ? (checked ? 1 : 0) : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/update-tasks/${selectedTask.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                
            </div>

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
                        required
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
                    />
                    {errors.task_description && (
                        <p className="mt-1 text-sm text-red-600">{errors.task_description}</p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="status"
                        name="status"
                        checked={data.status == 1}
                        onChange={(e) => setData("status", e.target.checked ? 1 : 0)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                        Mark as completed
                    </label>
                </div>

                <input type="hidden" name="user_id" value={auth.user.id} />
                <input type="hidden" name="selected_date" value={data.selected_date} />

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-2 border text-sm border-gray-600 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={12} className="mr-1" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>

            {data.status == 1 && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-start">
                    <Check size={18} className="flex-shrink-0 mt-0.5 mr-2" />
                    <p className="text-sm">This task will be marked as completed when you save changes.</p>
                </div>
            )}
        </div>
    );
}

export default EditDialog;