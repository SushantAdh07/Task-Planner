import { jsxs, Fragment, jsx } from "react/jsx-runtime";
function Sidebar() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("button", { className: "btn btn-light profile mx-auto", children: "Navigation" }) }),
    /* @__PURE__ */ jsx("hr", { className: "bg-light mt-3" }),
    /* @__PURE__ */ jsxs("nav", { className: "menu", children: [
      /* @__PURE__ */ jsx("a", { className: "menu-item", href: "", children: "Calendar" }),
      /* @__PURE__ */ jsx("a", { className: "menu-item", href: "", children: "Chat" })
    ] })
  ] });
}
export {
  Sidebar as default
};
