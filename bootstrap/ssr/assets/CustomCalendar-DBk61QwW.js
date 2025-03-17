import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, subMonths, addMonths, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "./Dialog-BJ_1HN8p.js";
import "./EditDialog-DT0kblGB.js";
import "@inertiajs/react";
import "./InputDialog-CdZYwUKK.js";
function CustomCalendar({ tasks, loggedInUser, selectedUser, users }) {
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
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Task Calendar" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrevMonth,
            className: "p-2 hover:bg-gray-100 rounded-full",
            children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700", children: format(currentDate, "MMMM yyyy") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNextMonth,
            className: "p-2 hover:bg-gray-100 rounded-full",
            children: /* @__PURE__ */ jsx(ChevronRight, { size: 24 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-2", children: [
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (day) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-center font-semibold text-gray-600 py-2",
            children: day
          },
          day
        )
      ),
      Array.from({ length: firstDayIndex }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "p-2" }, `empty-${index}`)),
      daysInMonth.map((date) => {
        const dayTasks = getTasksForDate(date);
        const isCurrentMonth = isSameMonth(date, currentDate);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                                    ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                                    ${dayTasks.length > 0 ? "hover:bg-blue-50 border-blue-400" : "hover:bg-gray-50"}
                                `,
            onClick: () => handleDateClick(date),
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-right text-xs font-medium text-gray-900", children: format(date, "d") }),
              dayTasks.slice(0, 2).map((task) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-xs bg-blue-100 text-blue-800 p-1 rounded mt-1 truncate",
                  children: task.task_name
                },
                task.id
              )),
              dayTasks.length > 2 && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "See more" })
            ]
          },
          date.toISOString()
        );
      })
    ] }),
    showDialog && selectedDate && /* @__PURE__ */ jsxs("div", { className: "dialog-box", children: [
      /* @__PURE__ */ jsx(
        Dialog,
        {
          value: selectedDate.toLocaleDateString("en-CA"),
          tasks,
          loggedInUser,
          selectedUser,
          users
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn neutralButton mt-3",
          onClick: () => setShowDialog(false),
          style: { padding: "10px 20px", fontSize: "16px" },
          children: "Close"
        }
      )
    ] })
  ] }) });
}
export {
  CustomCalendar as default
};
