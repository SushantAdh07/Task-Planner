import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
function EditDialog({ selectedTask, onClose }) {
  if (!selectedTask) return null;
  const { auth } = usePage().props;
  const [taskTitle, setTaskTitle] = useState(selectedTask.task_name);
  const [taskDesc, setTaskDesc] = useState(selectedTask.task_description);
  function handleSubmit(e) {
    e.preventDefault();
    const updatedTask = {
      user_id: auth.user.id,
      task_name: taskTitle,
      task_description: taskDesc,
      selected_date: selectedTask.selected_date
      // Use existing date
    };
    router.put(`/update-tasks/${selectedTask.id}`, updatedTask, {
      onSuccess: () => {
        router.visit("/home");
      }
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container-fluid dialog-body", children: [
    /* @__PURE__ */ jsx("div", { className: "col-md-3 p-2 dialog-sidebar", children: /* @__PURE__ */ jsx("h4", { children: "Task Details" }) }),
    /* @__PURE__ */ jsx("div", { className: "col-md-9 p-2 dialog-taskbar", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "taskTitle", className: "form-label", children: "Task Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "form-control",
            value: taskTitle,
            onChange: (e) => setTaskTitle(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "taskDesc", className: "form-label", children: "Task Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "form-control",
            id: "task_description",
            value: taskDesc,
            onChange: (e) => setTaskDesc(e.target.value),
            rows: "3"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "user_id", value: auth.user.id }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "hidden",
          id: "selected_date",
          value: selectedTask.selected_date,
          disabled: true
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn neutralButton", children: "Save Changes" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn neutralButton ml-2",
          onClick: onClose,
          children: "Cancel"
        }
      )
    ] }) })
  ] });
}
export {
  EditDialog as default
};
