import React, { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "./Dialog/Dialog";

function CustomCalendar({
    tasks=[],
    loggedInUser,
    selectedUser,
    users,
    members,
    errors,
    flash,
    comments,
}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const firstDayIndex = monthStart.getDay();

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowDialog(true);
    };

    

    const getTasksForDate = (date) => {
        return tasks.filter((task) =>
            isSameDay(new Date(task.selected_date), date)
        );
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft size={24} className="text-gray-600" />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-700">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronRight size={24} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="text-center font-semibold text-gray-600 py-2 text-sm"
                            >
                                {day}
                            </div>
                        )
                    )}

                    {Array.from({ length: firstDayIndex }).map((_, index) => (
                        <div key={`empty-${index}`} className="min-h-[80px]" />
                    ))}

                    {daysInMonth.map((date) => {
                        const dayTasks = getTasksForDate(date);
                        const isCurrentMonth = isSameMonth(date, currentDate);
                        const isCurrentDay = isToday(date);
                        const dayOfWeek = date.getDay(); 
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                        

                        return (
                            <button
                                key={date.toISOString()}
                                className={`min-h-[100px] p-1 border rounded-lg transition-colors flex flex-col
                                    ${
                                        isCurrentDay
                                            ? "!border-yellow-400 border border-3"
                                            : "bg-white"
                                    }
                                    ${
                                        isCurrentMonth
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }
                                    ${
                                        dayTasks.length > 0
                                            ? "hover:bg-blue-50"
                                            : "hover:bg-gray-50"
                                    }
                                    ${
                                        isWeekend
                                            ? "!bg-red-100 border-red-200"
                                            : ""
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                `}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className="text-right text-xs font-medium text-gray-900">
                                    {format(date, "d")}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    {dayTasks.slice(0, 2).map((task) => (
                                        <div
                                            key={task.id}
                                            className={`text-xs ${task.status == 1 ? "bg-green-200 text-black" : "bg-blue-500 text-white" } p-1 rounded mt-1 truncate`}
                                        >
                                            {task.task_name}
                                        </div>
                                    ))}
                                    {dayTasks.length > 2 && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            +{dayTasks.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {showDialog && selectedDate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <Dialog
                                value={selectedDate.toLocaleDateString("en-CA")}
                                tasks={tasks}
                                loggedInUser={loggedInUser}
                                selectedUser={selectedUser}
                                users={users}
                                errors={errors}
                                flash={flash}
                                comments={comments}
                            />
                            <div className="p-4 border-t flex">
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="mx-auto py-2 px-12 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomCalendar;
