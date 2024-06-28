<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import HomePageService from '@/service/HomePageService';

const { isDarkTheme } = useLayout();

let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');


const dataHome = ref({});
const dataTopStudents = ref({});
const studentActiveChart = ref({});
const studentActiveChartOption = ref({});
const studentGenderChart = ref({});
const studentGenderChartOption = ref({});
const studentAchVlnChart = ref({});
const studentAchVlnChartOption = ref({});
const studentAttandenceChart = ref({});
const studentAttandenceChartOption = ref({});
const lineOptions = ref(null);
const loading = ref(true);

const homePageService = new HomePageService();

onMounted(async () => {
    await homePageService.getDashboardData().then((data) => (dataHome.value = data))
    await homePageService.getTopStudentsData().then((data) => (dataTopStudents.value = data))
    
    studentActiveChart.value = {
        labels: ['Siswa Aktif', "Siswa Tidak Aktif"],
        datasets: [
            {
                data: [dataHome.value.student_active, dataHome.value.student_nonactive],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    studentActiveChartOption.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    studentGenderChart.value = {
        labels: ['Laki-Laki', "Perempuan"],
        datasets: [
            {
                data: [dataHome.value.student_gender_male, dataHome.value.student_gender_female],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    studentGenderChartOption.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    studentAchVlnChart.value = {
        labels: ['Pelanggaran Siswa', "Pencapaian Siswa"],
        datasets: [
            {
                data: [dataHome.value.student_violation, dataHome.value.student_achievement],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    studentAchVlnChartOption.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    studentAttandenceChart.value = {
        labels: ['Tepat Waktu', "Terlambat"],
        datasets: [
            {
                data: [dataHome.value.attandence_notlate, dataHome.value.attandence_islate],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    studentAttandenceChartOption.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    loading.value = false;
});

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="card">
        <h1>Selamat Datang Di Dashboard SMAN 24 Bandung</h1>
        <p>Jl. Baturaden VIII No.21, Mekarjaya, Kec. Rancasari, Kota Bandung, Jawa Barat 40292</p>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable ref="dt" 
                    :value="dataTopStudents" 
                    dataKey="student_id"
                    :loading="loading"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Top 5 Presensi Siswa</h5>
                        </div>
                    </template>

                    <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="NIS" header="NIS" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">NIS</span>
                            {{ slotProps.data.NIS }}
                        </template>
                    </Column>
                    <Column field="NISN" header="NISN" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">NISN</span>
                            {{ slotProps.data.NISN }}
                        </template>
                    </Column>
                    <Column field="code" header="Kelamin" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">kelamin</span>
                            {{ slotProps.data.code }}
                        </template>
                    </Column>
                    <Column field="classroom_name" header="Kelas" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Kelas</span>
                            {{ slotProps.data.classroom_name }}
                        </template>
                    </Column>
                    <Column field="active_status" header="Status" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status</span>
                            <template v-if="slotProps.data.active_status">
                                Aktif
                            </template>
                            <template v-else>
                                Tidak Aktif
                            </template>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Total Siswa Aktif</span>
                        <div class="text-900 font-medium text-xl">{{ dataHome.student_active }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-blue-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Total Absen Hari Ini</span>
                        <div class="text-900 font-medium text-xl">{{ dataHome.attandence }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Total Daftar Pencapaian</span>
                        <div class="text-900 font-medium text-xl">{{ dataHome.achievement }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Total Daftar Pelanggaran</span>
                        <div class="text-900 font-medium text-xl">{{ dataHome.violation }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Perbandingan Keaktifan status siswa</h5>
                <Chart type="pie" :data="studentActiveChart" :options="studentActiveChartOption"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Perbandingan pencapaian dan pelanggaran</h5>
                <Chart type="doughnut" :data="studentAchVlnChart" :options="studentAchVlnChartOption"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Perbandingan Gender Siswa</h5>
                <Chart type="doughnut" :data="studentGenderChart" :options="studentGenderChartOption"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Perbandingan Kehadiran</h5>
                <template v-if="dataHome.attandence_notlate == 0">
                    <h3>Tidak Ada Kehadiran Hari Ini</h3>
                </template>
                <template v-else>
                    <Chart type="pie" :data="studentAttandenceChart" :options="studentAttandenceChartOption"></Chart>
                </template>
            </div>
        </div>
    </div>
</template>
