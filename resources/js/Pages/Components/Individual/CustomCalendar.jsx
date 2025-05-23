
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

function CustomCalendar({ tasks, loggedInUser, selectedUser, users, errors, flash, comments }) {
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

  const getTasksForDate = (date) => tasks.filter((task) => isSameDay(new Date(task.selected_date), date));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">My Calendar</h1>
          <div className="flex items-center gap-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft size={22} />
            </button>
            <span className="text-xl font-medium text-gray-700">{format(currentDate, "MMMM yyyy")}</span>
            <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 font-medium mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-20" />
          ))}

          {daysInMonth.map((date) => {
            const dayTasks = getTasksForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isCurrentDay = isToday(date);
            const isWeekend = [0, 6].includes(date.getDay());

            return (
              <button
                key={date}
                onClick={() => handleDateClick(date)}
                className={`h-20 p-2 rounded-xl border text-left relative group transition-all
                  ${isCurrentDay ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}
                  ${!isCurrentMonth ? "bg-gray-100 text-gray-400" : "bg-white"}
                  ${isWeekend && isCurrentMonth ? "bg-red-50" : ""}
                  hover:shadow-md focus:outline-none`}
              >
                <div className="text-xs font-semibold text-gray-700 absolute top-2 right-2">{format(date, "d")}</div>
                <div className="mt-6 space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded truncate">
                      {task.task_name}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-400">+{dayTasks.length - 2} more</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dialog */}
        {showDialog && selectedDate && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden">
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
              <div className="p-4 border-t flex justify-center">
                <button
                  onClick={() => setShowDialog(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
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
