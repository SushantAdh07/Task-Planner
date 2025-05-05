import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isToday, subMonths, addMonths, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "./Dialog-DCw2FVRF.js";
import "./EditDialog-Bqwikluw.js";
import "@inertiajs/react";
import "./InputDialog-WMgnmvsC.js";
function CustomCalendar({
  tasks,
  loggedInUser,
  selectedUser,
  users,
  errors,
  flash
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
  return /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-6 gap-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800", children: format(currentDate, "MMMM yyyy") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrevMonth,
            className: "p-2 rounded-full hover:bg-gray-100 transition-colors",
            "aria-label": "Previous month",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 text-gray-600" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentDate(/* @__PURE__ */ new Date()),
            className: "px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors",
            children: "Today"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNextMonth,
            className: "p-2 rounded-full hover:bg-gray-100 transition-colors",
            "aria-label": "Next month",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5 text-gray-600" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-px mb-px bg-gray-200", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
      (day) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "text-center text-xs font-semibold text-gray-500 py-2 bg-white uppercase tracking-wider",
          children: [
            day.charAt(0),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: day.substring(1) })
          ]
        },
        day
      )
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-px bg-gray-200", children: [
      Array.from({ length: firstDayIndex }).map((_, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "aspect-square bg-white"
        },
        `empty-${index}`
      )),
      daysInMonth.map((date) => {
        const dayTasks = getTasksForDate(date);
        const isCurrentMonth = isSameMonth(date, currentDate);
        const isCurrentDay = isToday(date);
        const hasTasks = dayTasks.length > 0;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleDateClick(date),
            className: `aspect-square min-h-[50px] sm:min-h-[80px] p-1 flex flex-col items-end bg-white
                                ${isCurrentDay ? "ring-2 ring-blue-400 z-10" : ""}
                                ${hasTasks ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}
                                ${!isCurrentMonth ? "opacity-50" : ""}
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                            `,
            "aria-label": `Day ${format(date, "d")} ${hasTasks ? `with ${dayTasks.length} tasks` : ""}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: `text-xs font-medium
                                ${isCurrentDay ? "text-blue-800" : "text-gray-700"}
                                ${!isCurrentMonth ? "text-gray-400" : ""}
                            `, children: format(date, "d") }),
              /* @__PURE__ */ jsxs("div", { className: "w-full mt-1 overflow-hidden", children: [
                dayTasks.slice(0, 2).map((task) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 truncate",
                    children: task.task_name
                  },
                  task.id
                )),
                dayTasks.length > 2 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
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
          errors
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t flex", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowDialog(false),
          className: "mx-auto py-2 px-12 text-white bg-blue-600 hover:bg-blue-900 rounded-lg transition-colors",
          children: "Close"
        }
      ) })
    ] }) })
  ] });
}
export {
  CustomCalendar as default
};
