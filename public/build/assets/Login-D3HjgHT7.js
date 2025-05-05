import { jsxs, jsx } from "react/jsx-runtime";
import { T as TextInput, I as InputError } from "./TextInput-D6QpfsRb.js";
import { P as PrimaryButton } from "./PrimaryButton-9sXKAnSO.js";
import { G as GuestLayout } from "./GuestLayout-DXDBr7Kv.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-CDM_RYOK.js";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-lg dark:bg-gray-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-[#57ACF8] rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: "Welcome Back" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-300", children: "Sign in to access your tasks" })
      ] }),
      status && /* @__PURE__ */ jsx("div", { className: "mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-sm dark:bg-green-900 dark:text-green-100", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              type: "email",
              name: "email",
              value: data.email,
              className: `w-full px-4 py-3 rounded-lg border-2 ${errors.email ? "border-red-400" : "border-gray-200"} focus:border-[#57ACF8] focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white`,
              autoComplete: "username",
              isFocused: true,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "Email address"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-1 text-sm" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: `w-full px-4 py-3 rounded-lg border-2 ${errors.password ? "border-red-400" : "border-gray-200"} focus:border-[#57ACF8] focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white`,
              autoComplete: "current-password",
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-1 text-sm" })
        ] }),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            className: "w-full flex justify-center py-3 px-4 bg-gradient-to-r from-[#57ACF8] to-[#29447F] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300",
            disabled: processing,
            children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex mx-auto items-center justify-center", children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Signing in..."
            ] }) : "Sign in"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Login as default
};
