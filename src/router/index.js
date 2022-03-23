import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [{
        path: "/",
        name: "home",
        component: LoginView,
    },
    {
        path: "/students",
        name: "students",
        component: () =>
            import ("../views/StudentView.vue"),
    },
    {
        path: "/faculty",
        name: "faculty",
        component: () =>
            import ("../views/FacultyView.vue"),
    },
    {
        path: "/class",
        name: "class",
        component: () =>
            import ("../views/ClassView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("../views/RegisterView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;