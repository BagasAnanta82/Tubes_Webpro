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
                    path : "/attendence",
                    name : "attendance",
                    component : () => import("@/views/home/Attendance.vue")
                },
                {
                    path : "/attendence/time",
                    name : "attendancetime",
                    component : () => import("@/views/home/AttendenceTime.vue")
                },
                {
                    path : "/attendence/student",
                    name : "attandencestudentpermit",
                    component : () => import("@/views/home/AttendencePermit.vue")
                },
                {
                    path : "/attendence/type",
                    name : "attandencepermittype",
                    component : () => import("@/views/home/AttendencePermitType.vue")
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
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import('@/views/auth/NotFound.vue')
        },
        {
            path: '/auth/',
            name: 'auth',
            component: () => import('@/views/auth/Login.vue')
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
