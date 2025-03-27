import React, { useState, useEffect } from "react";
import EditDialog from "./EditDialog";
import InputDialog from "./InputDialog";
import { router, useForm } from "@inertiajs/react";

function Dialog({ value, tasks, loggedInUser, selectedUser, users, errors }) {
    const [inputDialog, setInputDialog] = useState(false); // Track if InputDialog is open
    const [editDialog, setEditDialog] = useState(null); // Track which task is being edited
    const [selectedTask, setSelectedTask] = useState(null); // Track the selected task

    // Filter tasks for the selected date
    const filteredTasks = tasks.filter((task) => task.selected_date === value);

    // Set the first task as default when the date changes
    useEffect(() => {
        if (filteredTasks.length > 0) {
            setSelectedTask(filteredTasks[0]); // Select first task by default
        } else {
            setSelectedTask(null); // No task available
        }
    }, [value, tasks]); // Runs when date or tasks change

    // Open InputDialog when "+" button is clicked
    const openInputDialog = () => {
        if (loggedInUser === selectedUser) {
            setInputDialog(true);
        }
    };

    // Open EditDialog for the selected task
    const openEditDialog = () => {
        if (loggedInUser === selectedUser) {
            setEditDialog(selectedTask?.id);
        }
    };

    // Close dialogs
    const closeDialog = () => {
        setInputDialog(false);
        setEditDialog(null);
    };

    function destroy() {
        if (confirm("Are you sure you want to delete the task?")) {
            router.delete(route("task.delete", selectedTask.id));
        }
    }

    return (
        <div className="container-fluid dialog-body">
            <div className="col-md-3 p-3 dialog-sidebar">
                <div className="row">
                    <h4 className="col">Tasks</h4>
                    {loggedInUser === selectedUser && (
                        <button className="col" onClick={openInputDialog}>
                            +
                        </button>
                    )}
                </div>

                {filteredTasks.map((task, index) => (
                    <li className="task-lists" key={task.id}>
                        <button
                            className={`btn btn-light task-buttons ${
                                selectedTask?.id === task.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedTask(task)}
                        >
                            Task {index + 1}
                        </button>
                    </li>
                ))}
            </div>

            <div className="col-md-9 p-3 dialog-taskbar">
                <span style={{ gap: "10px" }}>
                    <button className="btn neutralButton">
                        <p>
                            <strong>
                                {
                                    users.find(
                                        (user) => user.id === selectedUser
                                    )?.name
                                }
                            </strong>{" "}
                            on {value}
                        </p>
                    </button>

                    <div className="mt-3">
                        {inputDialog ? (
                            <InputDialog value={value} errors={errors} />
                        ) : selectedTask ? (
                            <div>
                                <p>
                                    <strong>Task Name</strong>

                                    <br />
                                    {selectedTask.task_name}
                                </p>
                                <hr className="mt-2 mb-2" />
                                <p>
                                    <strong>Task Description: </strong>
                                    <br />
                                    {selectedTask.task_description}
                                </p>

                                {selectedTask.status == 1 ? (
                                    <i className="fas fa-check-circle text-success me-2">
                                        Completed
                                    </i>
                                ) : null}

                                <div className="mt-3">
                                    {loggedInUser === selectedUser && (
                                        <>
                                            <button
                                                className="btn neutralButton"
                                                onClick={() =>
                                                    openEditDialog(
                                                        selectedTask.id
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            {editDialog === selectedTask.id && (
                                                <div className="editDialog-box">
                                                    <EditDialog
                                                        value={value}
                                                        selectedTask={
                                                            selectedTask
                                                        }
                                                    />
                                                    <button
                                                        className="btn neutralButton mt-3"
                                                        onClick={closeDialog}
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            )}

                                            <button
                                                className="btn delete-task"
                                                onClick={destroy}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : loggedInUser === selectedUser ? (
                            <InputDialog value={value} />
                        ) : (
                            <h1>No tasks available</h1>
                        )}
                    </div>
                </span>
            </div>
        </div>
    );
}

export default Dialog;
