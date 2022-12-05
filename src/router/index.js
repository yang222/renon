
import {createRouter, createWebHashHistory} from "vue-router";
import Layout from "../views/layout/index.vue";

const routes = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
            {
                path: "/home",
                name: "Home",
                meta: {
                    title: 'Home',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/home/index.vue")
            },
            {
                path: "/home/device",
                name: "HomeDevice",
                meta: {
                    title: 'Device',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/device/index.vue")
            },
            {
                path: "/device",
                name: "Device",
                meta: {
                    title: 'Device',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/device/index.vue")
            },
            {
                path: "/event",
                name: "Event",
                meta: {
                    title: 'Event',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/event/index.vue")
            },
            {
                path: "/setting",
                name: "Setting",
                meta: {
                    title: 'Setting',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/setting/index.vue")
            },
            {
                path: "/upgrade",
                name: "Upgrade",
                meta: {
                    title: 'Upgrade',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/upgrade/index.vue")
            },
            {
                path: "/person-info",
                name: "PersonInfo",
                meta: {
                    title: 'Personal Information',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/info/index.vue")
            },
            {
                path: "/home/detail",
                name: "Detail",
                meta: {
                    title: 'Detail',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/detail/index.vue")
            },
            {
                path: "/device-list",
                name: "DeviceList",
                meta: {
                    title: 'Device List',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/deviceList/index.vue")
            },
            {
                path: "/management",
                name: "Management",
                meta: {
                    title: 'User Management',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/management/index.vue")
            },
            {
                path: "/user-management",
                name: "UserManagement",
                meta: {
                    title: 'End User Management',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/userManagement/index.vue")
            },
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: 'Login',
            isWhite:true,
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/login/index.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
            isWhite:true,
        },
        component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // const token = localStorage.getItem("token");
    // if(to.meta.isWhite){
    //     next()
    // }else if (!token && to.path !== '/login') {
    //     next('/login');
    // }else{
    //     next()
    // }
    next();
});

export default router;