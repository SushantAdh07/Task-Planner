import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm } from "@inertiajs/react";
function Commenter({
  comments = [],
  loggedInUser,
  selectedUser,
  taskId
}) {
  const { data, setData, post, processing } = useForm({
    content: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/tasks/${taskId}/comments`, {
      preserveScroll: true,
      onSuccess: () => setData("content", "")
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "comment-section mt-4", children: [
    /* @__PURE__ */ jsxs("h5", { children: [
      "Comments (",
      comments.length,
      ")"
    ] }),
    comments.length > 0 ? /* @__PURE__ */ jsx("div", { className: "comment-list mt-2", children: comments.map((comment) => {
      var _a;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "comment-card mb-3 p-3 bg-light rounded",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "comment-header d-flex justify-content-between align-items-center mb-2", children: [
              /* @__PURE__ */ jsx("strong", { children: (_a = comment.user) == null ? void 0 : _a.name }),
              /* @__PURE__ */ jsx("small", { className: "text-muted", children: new Date(
                comment.created_at
              ).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "comment-body", children: /* @__PURE__ */ jsx("p", { className: "mb-0", children: comment.content }) })
          ]
        },
        comment.id
      );
    }) }) : /* @__PURE__ */ jsx("p", { className: "text-muted", children: "No comments yet" }),
    loggedInUser === selectedUser && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "form-control",
          value: data.content,
          onChange: (e) => setData("content", e.target.value),
          placeholder: "Add a comment...",
          rows: "3",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "btn btn-primary mt-2",
          disabled: processing,
          children: processing ? "Posting..." : "Post Comment"
        }
      )
    ] })
  ] });
}
export {
  Commenter as default
};
