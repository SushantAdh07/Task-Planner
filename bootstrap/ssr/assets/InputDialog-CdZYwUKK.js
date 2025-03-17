import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React from "react";
import { usePage, router } from "@inertiajs/react";
function InputDialog({ value, tasks }) {
  const { auth } = usePage().props;
  const [values, setValues] = React.useState({
    user_id: auth.user.id,
    task_name: "",
    task_description: "",
    selected_date: value
  });
  function handleChange(e) {
    const key = e.target.id;
    const value2 = e.target.value;
    setValues((values2) => ({
      ...values2,
      [key]: value2
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    router.post("/tasks", values, {
      onSuccess: () => {
        router.visit("/home");
      }
    });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "dialog-input", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "taskTitle", className: "form-label", children: "Task Title" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "task_name",
          id: "task_name",
          className: "form-control",
          value: values.task_name,
          onChange: handleChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "taskDesc", className: "form-label", children: "Task Description" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "form-control",
          name: "task_description",
          id: "task_description",
          value: values.task_description,
          onChange: handleChange,
          rows: "3"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "user_id", value: auth.user.id }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "hidden",
        name: "selected_date",
        id: "selected_date",
        value: values.selected_date
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "btn neutralButton", children: "Submit" })
  ] }) }) });
}
export {
  InputDialog as default
};
