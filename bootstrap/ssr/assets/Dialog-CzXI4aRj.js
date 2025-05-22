import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import EditDialog from "./EditDialog-pzEt6UPz.js";
import InputDialog from "./InputDialog-DAkcsFju.js";
import Commenter from "./Commenter-DwrxUdZm.js";
import { router } from "@inertiajs/react";
import { Plus, X, CircleCheck, Edit2, Trash2 } from "lucide-react";
import "postcss";
function Dialog({
  value,
  tasks,
  loggedInUser,
  selectedUser,
  users,
  errors,
  comments
}) {
  var _a;
  const [inputDialog, setInputDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const filteredTasks = tasks.filter((task) => task.selected_date === value);
  useEffect(() => {
    if (filteredTasks.length > 0) {
      setSelectedTask(filteredTasks[0]);
    } else {
      setSelectedTask(null);
    }
  }, [value, tasks]);
  const openInputDialog = () => {
    if (loggedInUser === selectedUser) {
      setInputDialog(true);
      setEditDialog(null);
    }
  };
  const openEditDialog = (taskId) => {
    if (loggedInUser === selectedUser) {
      setEditDialog(taskId);
      setInputDialog(false);
    }
  };
  const closeDialog = () => {
    setInputDialog(false);
    setEditDialog(null);
  };
  const destroy = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      router.delete(route("task.delete", selectedTask.id));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row h-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${mobileView && (inputDialog || editDialog) ? "hidden" : "block"} w-full md:w-1/3 bg-blue-800 text-white p-4 rounded-t-lg md:rounded-l-lg md:rounded-tr-none`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold", children: [
              "Tasks for ",
              value
            ] }),
            loggedInUser === selectedUser && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openInputDialog,
                className: "p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors",
                "aria-label": "Add new task",
                children: /* @__PURE__ */ jsx(Plus, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 max-h-[300px] md:max-h-[400px] overflow-y-auto", children: filteredTasks.length > 0 ? filteredTasks.map((task, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTask(task),
              className: `w-full text-left p-3 rounded-lg transition-colors ${(selectedTask == null ? void 0 : selectedTask.id) === task.id ? "bg-blue-600 border border-white border-2" : "bg-blue-600 hover:bg-blue-600"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Task ",
                  filteredTasks.length - index,
                  ":",
                  " ",
                  task.task_name
                ] }),
                task.status === 1 && /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-500 text-white px-2 py-1 rounded-full", children: "Done" })
              ] })
            }
          ) }, task.id)) : /* @__PURE__ */ jsx("li", { className: "text-center py-4 text-blue-200", children: "No tasks for this date" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${mobileView && (inputDialog || editDialog) ? "block" : "display"} md:block flex-1 bg-white p-6 rounded-b-lg md:rounded-r-lg md:rounded-bl-none overflow-y-auto`,
        children: inputDialog ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Create New Task" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: closeDialog,
                className: "text-gray-500 hover:text-gray-700",
                "aria-label": "Close dialog",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(InputDialog, { value, errors })
        ] }) : editDialog ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Edit Task" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: closeDialog,
                className: "text-gray-500 hover:text-gray-700",
                "aria-label": "Close dialog",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            EditDialog,
            {
              selectedTask,
              onClose: closeDialog
            }
          )
        ] }) : selectedTask ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
            (_a = users.find(
              (user) => user.id === selectedUser
            )) == null ? void 0 : _a.name,
            " ",
            "• ",
            value
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 px-4 py-2.5 space-y-4 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800", children: selectedTask.task_name }),
              selectedTask.status === 1 && /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(CircleCheck, { color: "white", fill: "#00ff1e", size: 24 }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 whitespace-pre-line", children: selectedTask.task_description || "No description provided" }),
            loggedInUser === selectedUser && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 pt-4 border-t border-gray-200", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => openEditDialog(selectedTask.id),
                  className: "flex text-sm items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Edit2, { size: 12, className: "mr-1" }),
                    "Edit Task"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: destroy,
                  className: "flex text-sm items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { size: 12, className: "mr-1" }),
                    "Delete Task"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", {}),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: selectedTask && /* @__PURE__ */ jsx(
            Commenter,
            {
              initialComments: selectedTask.comments || [],
              loggedInUser,
              selectedUser,
              taskId: selectedTask.id
            }
          ) })
        ] }) : loggedInUser === selectedUser ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Plus, { className: "text-blue-600", size: 24 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-800 mb-2", children: "No task selected" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Select a task from the list or create a new one" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openInputDialog,
              className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              children: "Create New Task"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-800 mb-2", children: "No tasks available" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "This user has no tasks for this date" })
        ] })
      }
    )
  ] });
}
export {
  Dialog as default
};
