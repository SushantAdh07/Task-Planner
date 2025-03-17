import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React from "react";
import CustomCalendar from "./CustomCalendar-DBk61QwW.js";
import "date-fns";
import "lucide-react";
import "./Dialog-BJ_1HN8p.js";
import "./EditDialog-DT0kblGB.js";
import "@inertiajs/react";
import "./InputDialog-CdZYwUKK.js";
function Main({ tasks = [], users = [], auth }) {
  var _a;
  const loggedInUser = auth.user.id;
  React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(loggedInUser);
  const [userTasks, setUserTasks] = React.useState(
    tasks.filter((task) => task.user_id === loggedInUser)
  );
  const handleOpenCommentBox = (userId) => {
    setSelectedUserId(userId);
    setUserTasks(tasks.filter((task) => task.user_id === userId));
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "container p-3 main", children: /* @__PURE__ */ jsxs("div", { className: "col-md-12 mx-auto", children: [
    /* @__PURE__ */ jsxs("span", { className: "menu-name", children: [
      /* @__PURE__ */ jsxs("h2", { className: "menu-name-1", children: [
        "Calendar for ",
        auth.user.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dropdown", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "btn dropdown-toggle neutralButton",
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
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CustomCalendar,
      {
        tasks: userTasks,
        loggedInUser: auth.user.id,
        selectedUser: selectedUserId,
        users
      }
    )
  ] }) }) });
}
export {
  Main as default
};
