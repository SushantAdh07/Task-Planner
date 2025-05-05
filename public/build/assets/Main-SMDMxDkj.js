import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React from "react";
import CustomCalendar from "./CustomCalendar-BmGxP6Hc.js";
import { usePage } from "@inertiajs/react";
import "date-fns";
import "lucide-react";
import "./Dialog-DCw2FVRF.js";
import "./EditDialog-Bqwikluw.js";
import "./InputDialog-WMgnmvsC.js";
function Main({ tasks = [], users = [], auth, errors, children }) {
  var _a;
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "container p-3 main", children: /* @__PURE__ */ jsxs("div", { className: "col-md-12 mx-auto", children: [
    /* @__PURE__ */ jsxs("span", { className: "menu-name", children: [
      /* @__PURE__ */ jsxs("h2", { className: "menu-name-1", children: [
        "Calendar for ",
        auth.user.name
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "dropdown", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "btn dropdown-toggle neutralButton hover:text-white",
            href: "#",
            role: "button",
            id: "dropdownMenuLink",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
            children: ((_a = users.find(
              (user) => user.id === selectedUserId
            )) == null ? void 0 : _a.name) || auth.user.name
          }
        ),
        /* @__PURE__ */ jsx(
          "ul",
          {
            className: "dropdown-menu",
            "aria-labelledby": "dropdownMenuLink",
            children: users && users.map((user) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "a",
              {
                onClick: () => handleOpenCommentBox(
                  user.id
                ),
                className: "dropdown-item",
                href: "#",
                children: user.name
              }
            ) }, user.id))
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      CustomCalendar,
      {
        tasks: userTasks,
        loggedInUser: auth.user.id,
        selectedUser: selectedUserId,
        users,
        errors,
        flash
      }
    )
  ] }) }) });
}
export {
  Main as default
};
