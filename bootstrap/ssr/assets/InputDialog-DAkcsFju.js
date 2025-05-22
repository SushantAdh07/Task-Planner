import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import "react";
import { usePage, useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
function InputDialog({ value, errors }) {
  const { auth } = usePage().props;
  const { data, setData, post, processing, reset } = useForm({
    user_id: auth.user.id,
    task_name: "",
    task_description: "",
    selected_date: value
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/tasks", {
      preserveScroll: true,
      onSuccess: () => reset()
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "task_name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Task Title *" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "task_name",
          id: "task_name",
          value: data.task_name,
          onChange: handleChange,
          className: `w-full px-4 py-2 rounded-lg border ${errors.task_name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`,
          placeholder: "Enter task name",
          required: true,
          autoFocus: true
        }
      ),
      errors.task_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.task_name })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "task_description", className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          name: "task_description",
          id: "task_description",
          value: data.task_description,
          onChange: handleChange,
          rows: 4,
          className: `w-full px-4 py-2 rounded-lg border ${errors.task_description ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`,
          placeholder: "Add details about this task..."
        }
      ),
      errors.task_description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.task_description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 bg-gray-50 rounded-lg", children: /* @__PURE__ */ jsxs("p", { children: [
      "This task will be created for ",
      /* @__PURE__ */ jsx("strong", { children: value })
    ] }) }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "user_id", value: auth.user.id }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "selected_date", value: data.selected_date }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 pt-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => reset(),
          className: "px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-200 hover:bg-gray-400 transition-colors",
          disabled: processing,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "flex text-sm items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors",
          disabled: processing,
          children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }),
            "Creating..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Plus, { size: 12, className: "mr-2" }),
            "Create Task"
          ] })
        }
      )
    ] })
  ] }) });
}
export {
  InputDialog as default
};
