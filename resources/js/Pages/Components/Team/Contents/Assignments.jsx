import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TaskManager({ assignedToYou, assignedByYou }) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        assignee: '',
        due_date: '',
        priority: 'medium'
    });

    return (
        <div className='min-h-screen p-4'>

            <div className="min-h-screen bg-white from-slate-950 to-blue-950 p-6 font-['Poppins',sans-serif]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-black to-blue-800 bg-clip-text text-transparent">
                    Task Manager
                </h1>
                <PrimaryButton 
                    onClick={() => setShowTaskModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
                        <span className="text-xs text-slate-400">Assigned to you</span>
                    </div>

                    <div className="space-y-3">
                            <ol>
                                <li className="text-center py-6 text-white text-sm">
                                    No tasks assigned to you
                                </li> 
                            </ol>                       
                    </div>
                </div>

                <div className="bg-gradient-to-b from-slate-950/95 via-blue-950/95 to-slate-950/95 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            Assigned Tasks 
                        </h2>
                        <span className="text-xs text-slate-400">Assigned by you</span>
                    </div>

                    <div className="space-y-3">
                        
                            <ol>
                                <li className="text-center py-6 text-white text-sm">
                                You haven't assigned any tasks
                                </li>
                            </ol>
                    
                    </div>
                </div>
            </div>

            {showTaskModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 border border-white/10 rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-white">Assign New Task</h3>
                            <button 
                                onClick={() => setShowTaskModal(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Assign To</label>
                                <select
                                    className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newTask.assignee}
                                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                                >
                                    <option value="">Select team member</option>
                                    <option value="1">John Doe</option>
                                    <option value="2">Jane Smith</option>
                                    <option value="3">Mike Johnson</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={newTask.due_date}
                                        required
                                        onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                                    <select
                                        className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={newTask.priority}
                                        required
                                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowTaskModal(false)}
                                    className="px-4 py-2 text-sm text-slate-300 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton
                                    type="button"
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    Assign Task
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        
        </div>
    );
}

