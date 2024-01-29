import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import {isAuthenticate, isUserAuth} from "@/middleware/Auth"


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                // {
                //     path: '/',
                //     name: 'dashboard',
                //     component: () => import('@/views/Dashboard.vue')
                // },
                {
                    path : "/",
                    name : "homepage",
                    component : () => import("@/views/home/HomePage.vue")
                },
                {
                    path : "/student",
                    name : "datasiswa",
                    component : () => import("@/views/home/Student.vue")
                },
                {
                    path : "/attendance",
                    name : "attendance",
                    component : () => import("@/views/home/Attendance.vue")
                },
                {
                    path : "/classroom",
                    name : "classroom",
                    component : () => import("@/views/home/Classroom.vue")
                },
                {
                    path : "/achievement",
                    name : "achievement",
                    component : () => import("@/views/home/Achievement.vue")
                },
                {
                    path : "/achievement/student",
                    name : "achievementstudent",
                    component : () => import("@/views/home/AchievementStudent.vue")
                },
                {
                    path : "/violation",
                    name : "violation",
                    component : () => import("@/views/home/Violation.vue")
                },
                {
                    path : "/violation/student",
                    name : "violationstudent",
                    component : () => import("@/views/home/ViolationStudent.vue")
                },
                // {
                //     path: '/uikit/formlayout',
                //     name: 'formlayout',
                //     component: () => import('@/views/uikit/FormLayout.vue')
                // },
                // {
                //     path: '/uikit/input',
                //     name: 'input',
                //     component: () => import('@/views/uikit/Input.vue')
                // },
                // {
                //     path: '/uikit/floatlabel',
                //     name: 'floatlabel',
                //     component: () => import('@/views/uikit/FloatLabel.vue')
                // },
                // {
                //     path: '/uikit/invalidstate',
                //     name: 'invalidstate',
                //     component: () => import('@/views/uikit/InvalidState.vue')
                // },
                // {
                //     path: '/uikit/button',
                //     name: 'button',
                //     component: () => import('@/views/uikit/Button.vue')
                // },
                // {
                //     path: '/uikit/table',
                //     name: 'table',
                //     component: () => import('@/views/uikit/Table.vue')
                // },
                // {
                //     path: '/uikit/list',
                //     name: 'list',
                //     component: () => import('@/views/uikit/List.vue')
                // },
                // {
                //     path: '/uikit/tree',
                //     name: 'tree',
                //     component: () => import('@/views/uikit/Tree.vue')
                // },
                // {
                //     path: '/uikit/panel',
                //     name: 'panel',
                //     component: () => import('@/views/uikit/Panels.vue')
                // },

                // {
                //     path: '/uikit/overlay',
                //     name: 'overlay',
                //     component: () => import('@/views/uikit/Overlay.vue')
                // },
                // {
                //     path: '/uikit/media',
                //     name: 'media',
                //     component: () => import('@/views/uikit/Media.vue')
                // },
                // {
                //     path: '/uikit/menu',
                //     component: () => import('@/views/uikit/Menu.vue'),
                //     children: [
                //         {
                //             path: '/uikit/menu',
                //             component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                //         },
                //         {
                //             path: '/uikit/menu/seat',
                //             component: () => import('@/views/uikit/menu/SeatDemo.vue')
                //         },
                //         {
                //             path: '/uikit/menu/payment',
                //             component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                //         },
                //         {
                //             path: '/uikit/menu/confirmation',
                //             component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                //         }
                //     ]
                // },
                // {
                //     path: '/uikit/message',
                //     name: 'message',
                //     component: () => import('@/views/uikit/Messages.vue')
                // },
                // {
                //     path: '/uikit/file',
                //     name: 'file',
                //     component: () => import('@/views/uikit/File.vue')
                // },
                // {
                //     path: '/uikit/charts',
                //     name: 'charts',
                //     component: () => import('@/views/uikit/Chart.vue')
                // },
                // {
                //     path: '/uikit/misc',
                //     name: 'misc',
                //     component: () => import('@/views/uikit/Misc.vue')
                // },
                // {
                //     path: '/blocks',
                //     name: 'blocks',
                //     component: () => import('@/views/utilities/Blocks.vue')
                // },
                // {
                //     path: '/utilities/icons',
                //     name: 'icons',
                //     component: () => import('@/views/utilities/Icons.vue')
                // },
                // {
                //     path: '/pages/timeline',
                //     name: 'timeline',
                //     component: () => import('@/views/pages/Timeline.vue')
                // },
                // {
                //     path: '/pages/empty',
                //     name: 'empty',
                //     component: () => import('@/views/pages/Empty.vue')
                // },
                // {
                //     path: '/pages/crud',
                //     name: 'crud',
                //     component: () => import('@/views/pages/Crud.vue')
                // },
                // {
                //     path: '/documentation',
                //     name: 'documentation',
                //     component: () => import('@/views/utilities/Documentation.vue')
                // },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/',
            name: 'auth',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
    ]
});

router.beforeEach(async (to, from) => {
    if (window.localStorage.getItem("token") == null) {
        window.localStorage.setItem("token", JSON.stringify({token : "", email : ""}))
        return {name : "auth"}
    }

    await isUserAuth()

    if (to.name == "auth" && isAuthenticate.value) {
        return {name : "homepage"}
    }

    if (to.name !== "auth" && !isAuthenticate.value){
        return {name : "auth"}
    }

})

export default router;
