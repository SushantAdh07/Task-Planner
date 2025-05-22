import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isToday, subMonths, addMonths, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "./Dialog-CzXI4aRj.js";
import "./EditDialog-pzEt6UPz.js";
import "@inertiajs/react";
import "./InputDialog-DAkcsFju.js";
import "./Commenter-DwrxUdZm.js";
import "postcss";
function CustomCalendar({
  tasks,
  loggedInUser,
  selectedUser,
  users,
  errors,
  flash,
  comments
}) {
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
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
    return tasks.filter(
      (task) => isSameDay(new Date(task.selected_date), date)
    );
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-6 gap-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Task Calendar" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrevMonth,
            className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24, className: "text-gray-600" })
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700", children: format(currentDate, "MMMM yyyy") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNextMonth,
            className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            children: /* @__PURE__ */ jsx(ChevronRight, { size: 24, className: "text-gray-600" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-1 mb-1", children: [
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (day) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-center font-semibold text-gray-600 py-2 text-sm",
            children: day
          },
          day
        )
      ),
      Array.from({ length: firstDayIndex }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "min-h-[80px]" }, `empty-${index}`)),
      daysInMonth.map((date) => {
        const dayTasks = getTasksForDate(date);
        const isCurrentMonth = isSameMonth(date, currentDate);
        const isCurrentDay = isToday(date);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            className: `min-h-[100px] p-1 border rounded-lg transition-colors flex flex-col
                                    ${isCurrentDay ? "!border-yellow-400 border border-3" : "bg-white"}
                                    ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                                    ${dayTasks.length > 0 ? "hover:bg-blue-50" : "hover:bg-gray-50"}
                                    ${isWeekend ? "!bg-red-100 border-red-200" : ""}
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                `,
            onClick: () => handleDateClick(date),
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-right text-xs font-medium text-gray-900", children: format(date, "d") }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden", children: [
                dayTasks.slice(0, 2).map((task) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "text-xs bg-blue-100 text-blue-800 p-1 rounded mt-1 truncate",
                    children: task.task_name
                  },
                  task.id
                )),
                dayTasks.length > 2 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
                  "+",
                  dayTasks.length - 2,
                  " more"
                ] })
              ] })
            ]
          },
          date.toISOString()
        );
      })
    ] }),
    showDialog && selectedDate && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(
        Dialog,
        {
          value: selectedDate.toLocaleDateString("en-CA"),
          tasks,
          loggedInUser,
          selectedUser,
          users,
          errors,
          flash,
          comments
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t flex", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowDialog(false),
          className: "mx-auto py-2 px-12 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors",
          children: "Close"
        }
      ) })
    ] }) })
  ] }) });
}
export {
  CustomCalendar as default
};
