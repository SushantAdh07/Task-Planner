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
    tasks,
    loggedInUser,
    selectedUser,
    users,
    errors,
    flash,
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
        <div className="p-4 md:p-6">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Today
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-px mb-px bg-gray-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-center text-xs font-semibold text-gray-500 py-2 bg-white uppercase tracking-wider"
                        >
                            {day.charAt(0)}
                            <span className="hidden sm:inline">{day.substring(1)}</span>
                        </div>
                    )
                )}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div 
                        key={`empty-${index}`} 
                        className="aspect-square bg-white"
                    />
                ))}

                {/* Calendar Days */}
                {daysInMonth.map((date) => {
                    const dayTasks = getTasksForDate(date);
                    const isCurrentMonth = isSameMonth(date, currentDate);
                    const isCurrentDay = isToday(date);
                    const hasTasks = dayTasks.length > 0;

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateClick(date)}
                            className={`aspect-square min-h-[50px] sm:min-h-[80px] p-1 flex flex-col items-end bg-white
                                ${isCurrentDay ? "ring-2 ring-blue-400 z-10" : ""}
                                ${hasTasks ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}
                                ${!isCurrentMonth ? "opacity-50" : ""}
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                            `}
                            aria-label={`Day ${format(date, "d")} ${hasTasks ? `with ${dayTasks.length} tasks` : ''}`}
                        >
                            <span className={`text-xs font-medium
                                ${isCurrentDay ? "text-blue-800" : "text-gray-700"}
                                ${!isCurrentMonth ? "text-gray-400" : ""}
                            `}>
                                {format(date, "d")}
                            </span>

                            <div className="w-full mt-1 overflow-hidden">
                                {dayTasks.slice(0, 2).map((task) => (
                                    <div
                                        key={task.id}
                                        className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 truncate"
                                    >
                                        {task.task_name}
                                    </div>
                                ))}
                                {dayTasks.length > 2 && (
                                    <div className="text-xs text-gray-500">
                                        +{dayTasks.length - 2} more
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Task Dialog */}
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
                        />
                        <div className="p-4 border-t flex">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="mx-auto py-2 px-12 text-white bg-blue-600 hover:bg-blue-900 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCalendar;