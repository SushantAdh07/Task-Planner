import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import EditDialog from "./EditDialog-DT0kblGB.js";
import InputDialog from "./InputDialog-CdZYwUKK.js";
import { router } from "@inertiajs/react";
function Dialog({ value, tasks, loggedInUser, selectedUser, users }) {
  var _a;
  const [inputDialog, setInputDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
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
    }
  };
  const openEditDialog = () => {
    if (loggedInUser === selectedUser) {
      setEditDialog(selectedTask == null ? void 0 : selectedTask.id);
    }
  };
  const closeDialog = () => {
    setInputDialog(false);
    setEditDialog(null);
  };
  function destroy() {
    if (confirm("Are you sure you want to delete the task?")) {
      router.delete(route("task.delete", selectedTask.id));
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "container-fluid dialog-body", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-md-3 p-3 dialog-sidebar", children: [
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("h4", { className: "col", children: "Tasks" }),
        loggedInUser === selectedUser && /* @__PURE__ */ jsx("button", { className: "col", onClick: openInputDialog, children: "+" })
      ] }),
      filteredTasks.map((task, index) => /* @__PURE__ */ jsx("li", { className: "task-lists", children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: `btn btn-light task-buttons ${(selectedTask == null ? void 0 : selectedTask.id) === task.id ? "active" : ""}`,
          onClick: () => setSelectedTask(task),
          children: [
            "Task ",
            index + 1
          ]
        }
      ) }, task.id))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-md-9 p-3 dialog-taskbar", children: /* @__PURE__ */ jsxs("span", { style: { gap: "10px" }, children: [
      /* @__PURE__ */ jsx("button", { className: "btn neutralButton", children: /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: (_a = users.find(
          (user) => user.id === selectedUser
        )) == null ? void 0 : _a.name }),
        " ",
        "on ",
        value
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-3", children: inputDialog ? /* @__PURE__ */ jsx(InputDialog, { value }) : selectedTask ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Task Name: " }),
          /* @__PURE__ */ jsx("br", {}),
          selectedTask.task_name
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "mt-2 mb-2" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Task Description: " }),
          /* @__PURE__ */ jsx("br", {}),
          selectedTask.task_description
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3", children: loggedInUser === selectedUser && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn neutralButton",
              onClick: () => openEditDialog(
                selectedTask.id
              ),
              children: "Edit"
            }
          ),
          editDialog === selectedTask.id && /* @__PURE__ */ jsxs("div", { className: "editDialog-box", children: [
            /* @__PURE__ */ jsx(
              EditDialog,
              {
                value,
                selectedTask
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn neutralButton mt-3",
                onClick: closeDialog,
                children: "Back"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn delete-task",
              onClick: destroy,
              children: "Delete"
            }
          )
        ] }) })
      ] }) : loggedInUser === selectedUser ? /* @__PURE__ */ jsx(InputDialog, { value }) : /* @__PURE__ */ jsx("h1", { children: "No tasks available" }) })
    ] }) })
  ] });
}
export {
  Dialog as default
};
