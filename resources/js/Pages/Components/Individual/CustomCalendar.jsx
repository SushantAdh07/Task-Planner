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
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

function ModernCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample tasks data - replace with your actual data source
  const [tasks, setTasks] = useState([
    { id: 1, title: "Team meeting", date: new Date(2023, 5, 15) },
    { id: 2, title: "Project deadline", date: new Date(2023, 5, 20) },
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayIndex = monthStart.getDay();

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const getTasksForDate = (date) => 
    tasks.filter((task) => isSameDay(new Date(task.date), date));

  const addNewTask = (title) => {
    if (!title || !selectedDate) return;
    setTasks([...tasks, {
      id: tasks.length + 1,
      title,
      date: selectedDate
    }]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Calendar Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-500">Manage your schedule</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800 min-w-[180px] text-center">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            
            <button 
              onClick={() => {
                setSelectedDate(new Date());
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[100px] border-r border-b border-gray-100" />
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
                  className={`min-h-[100px] p-2 text-left border-r border-b transition-all
                    ${isCurrentDay ? "bg-blue-50 border-blue-200" : "border-gray-100"}
                    ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
                    ${isWeekend && isCurrentMonth ? "bg-gray-50" : ""}
                    hover:bg-gray-50 focus:outline-none`}
                >
                  <div className={`flex justify-between items-start mb-1`}>
                    <span className={`text-sm font-medium 
                      ${isCurrentDay ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}
                      ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}`}>
                      {format(date, "d")}
                    </span>
                    {isCurrentDay && (
                      <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    {dayTasks.slice(0, 2).map((task) => (
                      <div 
                        key={task.id} 
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate"
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-400">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Event for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
              </h3>
              
              <input
                type="text"
                placeholder="Event title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewTask(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]');
                  addNewTask(input.value);
                  input.value = "";
                }}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernCalendar;