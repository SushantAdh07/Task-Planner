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

function CustomCalendar({ tasks, loggedInUser, selectedUser, users, errors }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const today = new Date();
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
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Task Calendar
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-700">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="text-center font-semibold text-gray-600 py-2"
                            >
                                {day}
                            </div>
                        )
                    )}

                    {Array.from({ length: firstDayIndex }).map((_, index) => (
                        <div key={`empty-${index}`} className="p-2"></div>
                    ))}

                    {daysInMonth.map((date) => {
                        const dayTasks = getTasksForDate(date);
                        const isCurrentMonth = isSameMonth(date, currentDate);
                        const isCurrentDay = isToday(date);

                        return (
                            <div
                                key={date.toISOString()}
                                className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                                    ${
                                        isCurrentDay
                                            ? "bg-yellow-300"
                                            : isCurrentMonth
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }
                                    ${
                                        dayTasks.length > 0
                                            ? "hover:bg-blue-50 border-blue-400"
                                            : "hover:bg-gray-50"
                                    }
                                `}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className="text-right text-xs font-medium text-gray-900">
                                    {format(date, "d")}
                                </div>
                                {dayTasks.slice(0, 2).map((task) => (
                                    <div
                                        key={task.id}
                                        className="text-xs bg-blue-100 text-blue-800 p-1 rounded mt-1 truncate"
                                    >
                                        {task.task_name}
                                    </div>
                                ))}
                                {dayTasks.length > 2 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        See more
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {showDialog && selectedDate && (
                    <div className="dialog-box">
                        <Dialog
                            value={selectedDate.toLocaleDateString("en-CA")}
                            tasks={tasks}
                            loggedInUser={loggedInUser}
                            selectedUser={selectedUser}
                            users={users}
                            errors={errors}
                        />
                        <button
                            className="btn neutralButton mt-3"
                            onClick={() => setShowDialog(false)}
                            style={{ padding: "10px 20px", fontSize: "16px" }}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomCalendar;
