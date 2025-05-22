import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React from "react";
import CustomCalendar from "./CustomCalendar-BhM_Kd22.js";
import { usePage, Link } from "@inertiajs/react";
import "date-fns";
import "lucide-react";
import "./Dialog-CzXI4aRj.js";
import "./EditDialog-pzEt6UPz.js";
import "./InputDialog-DAkcsFju.js";
import "./Commenter-DwrxUdZm.js";
import "postcss";
function Main({ tasks = [], users = [], auth, errors, children, comments = [] }) {
  var _a, _b;
  const loggedInUser = auth.user.id;
  React.useState(null);
  const { flash } = usePage().props;
  const [selectedUserId, setSelectedUserId] = React.useState(loggedInUser);
  const [userTasks, setUserTasks] = React.useState(
    tasks.filter((task) => task.user_id === loggedInUser).map((task) => ({
      ...task,
      comments: task.comments || []
      // Ensure comments exists
    }))
  );
  const handleOpenCommentBox = (userId) => {
    setSelectedUserId(userId);
    setUserTasks(
      tasks.filter((task) => task.user_id === userId).map((task) => ({
        ...task,
        comments: task.comments || []
      }))
    );
  };
  console.log("First comment's user:", (_a = comments[0]) == null ? void 0 : _a.user);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "container p-3 main", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate max-w-[50%] sm:max-w-[70%]", children: [
        "Calendar for ",
        auth.user.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dropdown ml-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "btn flex items-center gap-1 dropdown-toggle neutralButton hover:text-white",
            href: "#",
            role: "button",
            id: "dropdownMenuLink",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
            children: ((_b = users.find((user) => user.id === selectedUserId)) == null ? void 0 : _b.name) || auth.user.name
          }
        ),
        /* @__PURE__ */ jsxs(
          "ul",
          {
            className: "dropdown-menu",
            "aria-labelledby": "dropdownMenuLink",
            children: [
              users && users.map((user) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  onClick: () => handleOpenCommentBox(user.id),
                  className: `dropdown-item ${auth.user && auth.user.id === user.id ? "bg-gray-200 text-black" : ""}`,
                  href: "#",
                  children: user.name
                }
              ) }, user.id)),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("logout"), method: "post", className: "dropdown-item bg-blue-700 text-white hover:bg-blue-800", children: "Logout" }) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CustomCalendar,
      {
        tasks: userTasks,
        loggedInUser: auth.user.id,
        selectedUser: selectedUserId,
        users,
        errors,
        flash,
        comments
      }
    )
  ] }) });
}
export {
  Main as default
};
