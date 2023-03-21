import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";

import LoginPage from "./components/login/LoginPage.vue";
import HomePage from "./components/home/HomePage.vue";
import DetailsPage from "./components/details/DetailsPage.vue";

const Vue = createApp({});

const routes = [
    {
        path: "/",
        name: "root",
        component: LoginPage,
    },
    {
        path: "/index.html",
        redirect: "/",
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/pokemons",
        name: "HomePage",
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/pokemon/:name",
        name: "DetailsPage",
        component: DetailsPage,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("authToken") !== null;



    const redirects = [
        {
            evaluate: (to.matched.length === 0), // 404 not found
            action: () => next("/login")
        },
        {
            evaluate: (!isAuthenticated && to.matched.some((record) => record.name !== 'Login')), // User not logged
            action: () => next("/login")
        },
        {
            evaluate: (isAuthenticated && from.path === '/' && to.matched.some((record) => record.name !== 'HomePage') && to.matched.some((record) => record.name !== 'DetailsPage')), // First time and user is logged
            action: () => next("/pokemons")
        },
        {
            evaluate: (isAuthenticated && from.path === '/' && to.matched.some((record) => record.name === 'HomePage')), // First time, user is logged and arrive HomePage
            action: () => next()
        },
        {
            evaluate: (isAuthenticated && from.path === '/' && to.matched.some((record) => record.name === 'DetailsPage')), // First time, user is logged and arrive DetailsPage
            action: () => next()
        },
        {
            evaluate: true, // default
            action: () => next()
        }
    ];

    const callToAction = redirects.find(condition => condition.evaluate);
    callToAction.action();
});

Vue.use(router);

export default router;
