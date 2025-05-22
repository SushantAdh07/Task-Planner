import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, useForm, router } from "@inertiajs/react";
import "postcss";
import { useState, useEffect } from "react";
function Commenter({
  initialComments = [],
  loggedInUser,
  selectedUser,
  taskId
}) {
  const { flash } = usePage().props;
  const [comments, setComments] = useState(initialComments);
  const [deletingID, setDeletingID] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
    comment: ""
  });
  useEffect(() => {
    if (flash.newComment && flash.newComment.task_id === taskId && !comments.some((c) => c.id === flash.newComment.id)) {
      setComments((prev) => [...prev, flash.newComment]);
    }
  }, [flash.newComment, taskId, comments]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/tasks/${taskId}/comments`, {
      preserveScroll: true,
      onSuccess: () => setData("comment", "")
    });
  };
  const destroy = (commentId) => {
    setDeletingID(commentId);
    router.delete(route("comment.delete", commentId), {
      preserveScroll: true,
      onSuccess: () => {
        setComments(
          (prev) => prev.filter((comment2) => comment2.id !== commentId)
        );
      },
      onFinish: () => setDeletingID(null)
    });
  };
  const getInitials = (name) => {
    var _a;
    const names = name.trim().split(" ");
    const first = ((_a = names[0]) == null ? void 0 : _a.charAt(0).toUpperCase()) || "";
    const last = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
    return first + last;
  };
  return /* @__PURE__ */ jsxs("div", { className: "comment-section mt-4", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Comments" }),
      " ",
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-blue-600", children: [
        "(",
        comments.length,
        ")"
      ] })
    ] }),
    comments.length > 0 ? /* @__PURE__ */ jsx("div", { className: "comment-list mt-2", children: comments.map((comment2) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "comment-card mb-3 p-3 bg-blue-50 rounded",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm", children: getInitials(comment2.user.name) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("strong", { className: "text-md", children: comment2.user.name }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap", children: [
                /* @__PURE__ */ jsx("small", { children: new Date(
                  comment2.created_at
                ).toLocaleString() }),
                loggedInUser === comment2.user.id && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("small", { children: "•" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => destroy(comment2.id),
                      className: "text-red-600 hover:underline",
                      disabled: deletingID === comment2.id,
                      children: deletingID === comment2.id ? "Deleting..." : "Delete"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-gray-800 w-full pr-4", children: comment2.comment }) })
          ] })
        ] })
      },
      comment2.id
    )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted", children: "No comments yet" }),
    loggedInUser === selectedUser ? null : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: `form-control ${errors.comment ? "is-invalid" : ""}`,
            value: data.comment,
            onChange: (e) => setData("comment", e.target.value),
            placeholder: "Add a comment...",
            rows: "3",
            required: true
          }
        ),
        errors.comment && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.comment })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white mt-2 px-4 py-2 rounded-lg hover:bg-blue-800",
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
