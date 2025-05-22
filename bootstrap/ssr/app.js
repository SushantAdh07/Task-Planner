import { jsx } from "react/jsx-runtime";
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "TaskPlanner";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.jsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-BS6gh8C7.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-BmpNZ9ba.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-D3HjgHT7.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-DC3hyFLh.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-DCoKsXsJ.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-CdflMdqK.js"), "./Pages/Components/CustomCalendar.jsx": () => import("./assets/CustomCalendar-BhM_Kd22.js"), "./Pages/Components/Dialog/Commenter.jsx": () => import("./assets/Commenter-DwrxUdZm.js"), "./Pages/Components/Dialog/Dialog.jsx": () => import("./assets/Dialog-CzXI4aRj.js"), "./Pages/Components/Dialog/EditDialog.jsx": () => import("./assets/EditDialog-pzEt6UPz.js"), "./Pages/Components/Dialog/InputDialog.jsx": () => import("./assets/InputDialog-DAkcsFju.js"), "./Pages/Components/Dialog/TasksDialog.jsx": () => import("./assets/Home-C26k-yq-.js").then((n) => n.T), "./Pages/Components/Home.jsx": () => import("./assets/Home-C26k-yq-.js").then((n) => n.H), "./Pages/Components/Main.jsx": () => import("./assets/Main-Bxa8kGNk.js"), "./Pages/Components/Sidebar.jsx": () => import("./assets/Sidebar-DDhTo4Rc.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-C0wuj2YM.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-5bD26vdO.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-Bl6Dx7cL.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-CmdEwWRq.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-CLBrpUHA.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-B0RzpBoy.js"), "./Pages/ui/button.jsx": () => import("./assets/button-Ck3YHGE9.js"), "./Pages/ui/card.jsx": () => import("./assets/card-DmckRZrH.js") })
  ),
  setup({ el, App, props }) {
    {
      hydrateRoot(el, /* @__PURE__ */ jsx(App, { ...props }));
      return;
    }
  },
  progress: {
    color: "#4B5563"
  }
});
