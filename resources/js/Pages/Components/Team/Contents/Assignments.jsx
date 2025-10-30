import { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function TaskManager({
    assignedToYou,
    assignedByYou,
    members,
    auth,
    message,
    assignedTasks,
    assignedByYouTasks,
}) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const { props } = usePage();
    const teamId = props.currentTeam_id;
    const [showNotification, setShowNotification] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        assigned_tasks: "",
        user_id: "",
        due_date: "",
        priority: "low",
        team_id: teamId,
        assigned_by_user_id: auth?.user?.id ?? null,
        status: "pending",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    console.log("asgTsks:", assignedByYouTasks.assignedTo.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/plan/create/assignments", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowTaskModal(false);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            },
        });
    };

    return (
        <div className="min-h-screen p-4">
            {showNotification && (
                <div
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        props.flash?.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    {props.flash.message}
                </div>
            )}
            <div className="min-h-screen p-4">
                <div className="min-h-screen bg-white from-slate-950 to-blue-950 p-6 font-['Poppins',sans-serif]">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-semibold bg-gradient-to-r from-black to-blue-800 bg-clip-text text-transparent">
                            Task Manager
                        </h1>
                        <PrimaryButton
                            onClick={() => setShowTaskModal(true)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Assign Task
                        </PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-b from-slate-950/95 via-blue-950/95 to-slate-950/95 to-cyan-500 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                    Your Tasks
                                </h2>
                                <span className="text-xs text-slate-400">
                                    Assigned to you
                                </span>
                            </div>

                            <div className="space-y-3">
                                <ol>
                                    {assignedTasks.map((task, index) => (
                                        <li
                                            key={task.id}
                                            className={`text-center py-2 text-white text-sm ${
                                                index % 2 === 0
                                                    ? "bg-slate-950/95"
                                                    : "bg-blue-950/95"
                                            } rounded-md px-3 flex items-center justify-between`}
                                        >
                                            {task.assigned_tasks} <b> by {task.member.name}</b> 
                                            <span
                                                className={`text-xs font-medium px-2.5 py-0.5 ${
                                                    task.priority === "high"
                                                        ? "text-red-800 bg-red-200"
                                                        : task.priority ===
                                                          "medium"
                                                        ? "text-yellow-800 bg-yellow-200"
                                                        : "text-green-800 bg-green-200"
                                                } rounded-sm dark:bg-red-900 dark:text-red-300 `}
                                            >{task.priority}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-slate-950/95 via-blue-950/95 to-slate-950/95 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    Assigned Tasks
                                </h2>
                                <span className="text-xs text-slate-400">
                                    Assigned by you
                                </span>
                            </div>

                            <div className="space-y-3">
                                <ol>
                                    {assignedByYouTasks.map((task, index) => (
                                        <li
                                            key={task.id}
                                            className={`text-center py-2 text-white text-sm ${
                                                index % 2 === 0
                                                    ? "bg-slate-950/95"
                                                    : "bg-blue-950/95"
                                            } rounded-md px-3 flex items-center justify-between`}
                                        >
                                            {task.assigned_tasks} to {}
                                            <span
                                                className={`text-xs font-medium px-2.5 py-0.5 ${
                                                    task.priority === "high"
                                                        ? "text-red-800 bg-red-200"
                                                        : task.priority ===
                                                          "medium"
                                                        ? "text-yellow-800 bg-yellow-200"
                                                        : "text-green-800 bg-green-200"
                                                } rounded-sm dark:bg-red-900 dark:text-red-300 `}
                                            >{task.priority}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                    {showTaskModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-slate-800 border border-white/10 rounded-xl p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-white">
                                        Assign New Task
                                    </h3>
                                    <button
                                        onClick={() => setShowTaskModal(false)}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            Task Title
                                        </label>
                                        <input
                                            type="text"
                                            name="assigned_tasks"
                                            className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            value={data.assigned_tasks}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            Assign To
                                        </label>
                                        <select
                                            className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            name="user_id"
                                            id="user_id"
                                            value={data.user_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select a member
                                            </option>
                                            {members.map((member) => (
                                                <option
                                                    key={member.id}
                                                    value={member.id}
                                                >
                                                    {member.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                name="due_date"
                                                className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                value={data.due_date}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                                Priority
                                            </label>
                                            <select
                                                name="priority"
                                                className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                value={data.priority}
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="low" selected>
                                                    Low
                                                </option>
                                                <option value="medium">
                                                    Medium
                                                </option>
                                                <option value="high">
                                                    High
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="submit"
                                            onClick={() =>
                                                setShowTaskModal(false)
                                            }
                                            className="px-4 py-2 text-sm text-slate-300 hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                        >
                                            {processing
                                                ? "Assigning..."
                                                : "Assign Task"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
