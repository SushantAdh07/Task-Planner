import React from "react";
import { useForm, usePage } from "@inertiajs/react";

function InputDialog({ value }) {
    const { auth, errors } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        user_id: auth.user.id,
        task_name: "",
        task_description: "",
        selected_date: value,
    });

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        post("/tasks", {
            preserveScroll: true, // Prevents page reload
            onSuccess: () => reset(), // Reset form after success
        });
    }

    return (
        <div className="dialog-input">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="task_name" className="form-label">
                        Task Title
                    </label>
                    <input
                        type="text"
                        name="task_name"
                        id="task_name"
                        className="form-control"
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
                    <label htmlFor="task_description" className="form-label">
                        Task Description
                    </label>
                    <textarea
                        className="form-control"
                        name="task_description"
                        id="task_description"
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
                />

                <button
                    type="submit"
                    className="btn neutralButton"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default InputDialog;
