import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { authTokenGuard } from "@/middleware/Auth"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            beforeEnter : authTokenGuard,
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
                    path : "/student/attandence/in",
                    name : "studentAttandenceIn",
                    component : () => import("@/views/home/InputNIS.vue")
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
            beforeEnter : authTokenGuard,
            component: () => import('@/views/auth/Login.vue')
        },
        {
            path : "/parent/",
            name : "parent",
            component : () => import("@/views/home/ParentStudentAttandence.vue")
        },
        {
            path : "/student/attandence/in",
            name : "studentAttandenceIn",
            component : () => import("@/views/home/InputNIS.vue")
        },
    ]
});

export default router;
