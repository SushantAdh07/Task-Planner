import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

function EditDialog({ selectedTask, onClose }) {
    if (!selectedTask) return null;

    const { auth } = usePage().props;

    // State to store input values
    const [taskTitle, setTaskTitle] = useState(selectedTask.task_name);
    const [taskDesc, setTaskDesc] = useState(selectedTask.task_description);

    function handleSubmit(e) {
        e.preventDefault();

        // Prepare updated task data
        const updatedTask = {
            user_id: auth.user.id,
            task_name: taskTitle,
            task_description: taskDesc,
            selected_date: selectedTask.selected_date, // Use existing date
        };

        // Send update request
        router.put(`/update-tasks/${selectedTask.id}`, updatedTask, {
            onSuccess: () => {
                router.visit("/home");
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
                        <label htmlFor="taskTitle" className="form-label">
                            Task Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDesc" className="form-label">
                            Task Description
                        </label>
                        <textarea
                            className="form-control"
                            id="task_description"
                            value={taskDesc}
                            onChange={(e) => setTaskDesc(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>
                    <input type="hidden" name="user_id" value={auth.user.id} />
                    <input
                        type="hidden"
                        id="selected_date"
                        value={selectedTask.selected_date}
                        disabled
                    />

                    <button type="submit" className="btn neutralButton">
                        Save Changes
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
