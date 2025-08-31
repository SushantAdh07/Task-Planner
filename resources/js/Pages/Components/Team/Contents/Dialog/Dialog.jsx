import React, { useState, useEffect } from "react";
import EditDialog from "./EditDialog";
import InputDialog from "./InputDialog";
import Commenter from "./Commenter";
import { router, useForm } from "@inertiajs/react";
import { X, Plus, Edit2, Trash2, CircleCheck } from "lucide-react";

function Dialog({
    value,
    tasks,
    loggedInUser,
    selectedUser,
    users,
    errors,
    comments,
}) {
    const [inputDialog, setInputDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [mobileView, setMobileView] = useState(false);
    console.log('none');
    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredTasks = tasks.filter((task) => task.selected_date === value);

    useEffect(() => {
        if (filteredTasks.length > 0) {
            setSelectedTask(filteredTasks[0]);
        } else {
            setSelectedTask(null);
        }
    }, [value, tasks]);

    const openInputDialog = () => {
        if (loggedInUser === selectedUser) {
            setInputDialog(true);
            setEditDialog(null);
        }
    };

    const openEditDialog = (taskId) => {
        if (loggedInUser === selectedUser) {
            setEditDialog(taskId);
            setInputDialog(false);
        }
    };

    const closeDialog = () => {
        setInputDialog(false);
        setEditDialog(null);
    };

    const destroy = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(route("teamtask.delete", selectedTask.id));
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full">
            <div
                className={`${
                    mobileView && (inputDialog || editDialog)
                        ? "hidden"
                        : "block"
                } w-full md:w-1/3 bg-blue-800 text-white p-4 rounded-t-lg md:rounded-l-lg md:rounded-tr-none`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tasks for {value}</h3>
                    {loggedInUser === selectedUser && (
                        <button
                            onClick={openInputDialog}
                            className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors"
                            aria-label="Add new task"
                        >
                            <Plus size={18} />
                        </button>
                    )}
                </div>

                <ul className="space-y-2 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <li key={task.id}>
                                <button
                                    onClick={() => setSelectedTask(task)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                                        selectedTask?.id === task.id
                                            ? "bg-blue-600 border border-white border-2"
                                            : "bg-blue-600 hover:bg-blue-600"
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>
                                            Task {filteredTasks.length - index}:{" "}
                                            {task.task_name}
                                        </span>
                                        {task.status === 1 && (
                                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                                Done
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-center py-4 text-blue-200">
                            No tasks for this date
                        </li>
                    )}
                </ul>
            </div>

            {/* Main Content Area */}
            <div
                className={`${
                    mobileView && (inputDialog || editDialog)
                        ? "block"
                        : "display"
                } md:block flex-1 bg-white p-6 rounded-b-lg md:rounded-r-lg md:rounded-bl-none overflow-y-auto`}
            >
                {inputDialog ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Create New Task
                            </h3>
                            <button
                                onClick={closeDialog}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close dialog"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <InputDialog value={value} errors={errors} loggedInUser={loggedInUser}/>
                    </div>
                ) : editDialog ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Edit Task
                            </h3>
                            <button
                                onClick={closeDialog}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close dialog"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <EditDialog
                            selectedTask={selectedTask}
                            onClose={closeDialog}
                        />
                    </div>
                ) : selectedTask ? (
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500">
                                {
                                    users.find(
                                        (user) => user.id === selectedUser
                                    )?.name
                                }{" "}
                                • {value}
                            </p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2.5 space-y-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {selectedTask.task_name}
                                </h3>
                                {selectedTask.status === 1 && <div className="flex"><CircleCheck color="white" fill="#00ff1e" size={24} /></div>}
                            </div>

                            <p className="text-gray-600 whitespace-pre-line">
                                {selectedTask.task_description ||
                                    "No description provided"}
                            </p>
                            {loggedInUser === selectedUser && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() =>
                                            openEditDialog(selectedTask.id)
                                        }
                                        className="flex text-sm items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Edit2 size={12} className="mr-1" />
                                        Edit Task
                                    </button>
                                    <button
                                        onClick={destroy}
                                        className="flex text-sm items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 size={12} className="mr-1" />
                                        Delete Task
                                    </button>
                                </div>
                            )}
                        </div>

                        <hr />
                        <div className="mt-8">
                            {selectedTask && (
                                <Commenter
                                    initialComments={
                                        selectedTask.comments || []
                                    }
                                    loggedInUser={loggedInUser}
                                    selectedUser={selectedUser}
                                    taskId={selectedTask.id}
                                />
                            )}
                        </div>
                    </div>
                ) : loggedInUser === selectedUser ? (
                    <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Plus className="text-blue-600" size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No task selected
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Select a task from the list or create a new one
                        </p>
                        <button
                            onClick={openInputDialog}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create New Task
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No tasks available
                        </h3>
                        <p className="text-gray-500">
                            This user has no tasks for this date
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dialog;
