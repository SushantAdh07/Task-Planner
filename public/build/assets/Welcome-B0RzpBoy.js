import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function Welcome({ auth }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Task-Planning" }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-[#57ACF8] to-[#29447F] text-white", children: /* @__PURE__ */ jsx("div", { className: "relative flex min-h-screen flex-col items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center py-8 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "TaskPlanner" }),
        /* @__PURE__ */ jsx("nav", { className: "flex items-center space-x-4", children: auth.user ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("index"),
            className: "px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105",
            children: "Go to Dashboard"
          }
        ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105",
            children: "Log in"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "my-12 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Plan Your Work Effortlessly" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl opacity-90 max-w-2xl mx-auto", children: "The perfect task management solution for DHRC Team to organize projects and boost productivity." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-1 gap-8", children: [
          "https://i.ibb.co/MDb0w3FM/Screenshot-450.png",
          "https://i.ibb.co/gGmt2Hp/Screenshot-451.png",
          "https://i.ibb.co/V082vMp0/Screenshot-452.png",
          "https://i.ibb.co/TB14sJ6Y/Screenshot-453.png"
        ].map((src, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "overflow-hidden rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 transition-all hover:shadow-xl hover:border-opacity-40",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src,
                alt: `App screenshot ${index + 1}`,
                className: "w-full h-auto object-contain"
              }
            )
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("footer", { className: "py-8 text-center text-sm text-white text-opacity-70", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Task Planner - Designed for DHRC Team Productivity"
      ] })
    ] }) }) })
  ] });
}
export {
  Welcome as default
};
