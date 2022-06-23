const routes = [
  {
    path: "/auth",
    component: () => import("src/layouts/auth.vue"),
    children: [
      {
        path: "/auth",
        component: () => import("pages/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        name: "Dashboard",
      },
      {
        path: "/Account",
        component: () => import("pages/Account/Account.vue"),
        name: "Account",
      },
      {
        path: "setting",
        component: () => import("pages/Setting/MainSetting.vue"),
        name: "Setting",
        children: [
          {
            path: "/Categories",
            component: () => import("pages/Categories/Categories.vue"),
            name: "Categories",
          },
          {
            path: "/Client",
            component: () => import("pages/Client/Client.vue"),
            name: "Client",
          },
          {
            path: "/Employee",
            component: () => import("pages/Employee/Employee.vue"),
            name: "Employee",
          },
          {
            path: "/Item",
            component: () => import("pages/Item/Item.vue"),
            name: "Item",
          },
          {
            path: "/Stage",
            component: () => import("pages/Stage/stage.vue"),
            name: "Stage",
          },          {
            path: "/General",
            component: () => import("pages/Setting/Setting.vue"),
            name: "General",
          },
        ],
      },
      {
        path: "/Client",
        component: () => import("pages/Client/Client.vue"),
        name: "Client",
      },
      {
        path: "/Process",
        component: () => import("pages/Process/Process.vue"),
        name: "Process",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
