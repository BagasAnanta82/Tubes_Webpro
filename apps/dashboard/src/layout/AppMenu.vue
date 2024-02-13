<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Dashboard',
        items: [
            { label: 'Halaman Utaman', icon: 'pi pi-fw pi-home', to: '/' }
        ]
    },
    {
        label: 'Siswa',
        items: [
            { label: 'Daftar Siswa', icon: 'pi pi-users', to: '/student'}
        ]
    },
    {
        label: 'Presensi',
        items: [
            { label: 'Rekam Presensi Siswa', icon: 'pi pi-book', to: '/attendence'},
            { label: 'Rekam Absensi Siswa', icon: 'pi pi-book', to: '/attendence/student'},
            { label: 'Waktu Presensi Siswa', icon: 'pi pi-list', to: '/attendence/time'},
            { label: 'Daftar Status Presensi', icon: 'pi pi-list', to: '/attendence/type'},
        ]
    },
    {
        label: 'Kelas',
        items: [
            { label: 'Daftar Kelas', icon: 'pi pi-book', to: '/classroom'},
        ]
    },
    {
        label: 'Pencapaian',
        items: [
            { label: 'Daftar Pencapaian', icon: 'pi pi-book', to: '/achievement'},
            { label: 'Data Pencapaian Siswa', icon: 'pi pi-book', to: '/achievement/student'}
        ]
    },
    {
        label: 'Pelanggaran',
        items: [
            { label: 'Daftar Pelanggaran', icon: 'pi pi-book', to: '/violation'},
            { label: 'Data Pelanggaran Siswa', icon: 'pi pi-book', to: '/violation/student'}
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
