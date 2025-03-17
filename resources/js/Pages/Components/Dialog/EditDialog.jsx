import React from "react";
import { useForm, usePage } from "@inertiajs/react";

function EditDialog({ selectedTask, onClose }) {
    if (!selectedTask) return null;

    const { auth, errors } = usePage().props;

    // Use `useForm` to manage form data
    const { data, setData, put, processing, reset } = useForm({
        user_id: auth.user.id,
        task_name: selectedTask.task_name,
        task_description: selectedTask.task_description,
        selected_date: selectedTask.selected_date, // Keep the existing date
    });

    // Handle input changes
    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        put(`/update-tasks/${selectedTask.id}`, {
            onSuccess: () => {
                reset(); // Reset form after successful submission
                onClose(); // Close the modal/dialog
            },
        });
    }

    return (
        <div className="container-fluid dialog-body">
            <div className="col-md-3 p-2 dialog-sidebar">
                <h4>Task Details</h4>
            </div>

            <div className="col-md-9 p-2 dialog-taskbar">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="task_name" className="form-label">
                            Task Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="task_name"
                            value={data.task_name}
                            onChange={handleChange}
                        />
                        {errors.task_name && (
                            <p className="text-red-500 text-sm">
                                {errors.task_name}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="task_description"
                            className="form-label"
                        >
                            Task Description
                        </label>
                        <textarea
                            className="form-control"
                            name="task_description"
                            value={data.task_description}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                        {errors.task_description && (
                            <p className="text-red-500 text-sm">
                                {errors.task_description}
                            </p>
                        )}
                    </div>

                    <input type="hidden" name="user_id" value={auth.user.id} />
                    <input
                        type="hidden"
                        name="selected_date"
                        value={data.selected_date}
                        disabled
                    />

                    <button
                        type="submit"
                        className="btn neutralButton"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        className="btn neutralButton ml-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditDialog;
