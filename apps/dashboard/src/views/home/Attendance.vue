<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, callWithAsyncErrorHandling } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PresensiService from '@/service/PresensiService'
import ClassroomService from '@/service/ClassroomService'
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const siswa = ref(null)
const classroomSelect = ref(null)
const classroom = ref(null)
const filters = ref(null)
const loading = ref(true)
const isDateChange = ref(false)
const date = ref(new Date())
const dt = ref(null)
const generateDialog = ref(false)
const buttonDialogLoading = ref(false)

const presensiService = new PresensiService()
const classroomService = new ClassroomService()

onBeforeMount(() => {
    loading.value = false
    initFilter()
})

onMounted(() => {
    presensiService.getStudentAttendences().then((data) => (siswa.value = data))
    classroomService.getAllClassroom().then((data) => (classroom.value = data))
})

const initFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NIS: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NISN: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
}

const generateStudentDidNotTapping = async () => {
    const time = new Date(date.value)

    if (isDateChange.value) {
        time.setDate(time.getDate() + 1)
    }

    buttonDialogLoading.value = true
    toast.add({ severity: "info", summary: 'Sedang melakukan generasi data', detail: 'Harap Untuk Tidak Menutup Browser atau Tab pada proses sedang berlangsung', life: 5000 })
    await presensiService.generateStudentDidNotTapping(time.toISOString()).then((res) => (res.status ?
        toast.add({ severity: "success", summary: 'Berhasil', detail: 'Data Berhasil Digenerate', life: 3000 }) :
        toast.add({ severity: "error", summary: 'Gagal', detail: 'Gagal Untuk Melakuakan Generasi data', life: 3000 })
    ))
    generateDialog.value = false;
    buttonDialogLoading.value = false;
}

const clearFilter = () => {
    initFilter()
}

const exportCSV = async () => {
    const time = new Date(date.value)
    if (isDateChange.value) {
        time.setDate(time.getDate() + 1)
    }
    await presensiService.getStudentAttendencesExcelExport(time.toISOString());
};

watch(date, async (newDate, oldDate) => {
    const time = new Date(newDate)
    const clsRoom = (classroomSelect.value == null) ? null : classroomSelect.value.id
    time.setDate(time.getDate() + 1)
    isDateChange.value = true
    await presensiService.getStudentAttendences(time.toISOString(), clsRoom).then((val) => (siswa.value = val))
})

watch(classroomSelect, async (newClass, oldClass) => {
    const time = new Date(date.value)
    if (isDateChange.value) {
        time.setDate(time.getDate() + 1)
    }
    await presensiService.getStudentAttendences(time.toISOString(), newClass.id).then((val) => (siswa.value = val))
})
</script>

<template>
    <Toast />
    <div class="card">
        <h1>Rekam Presensi SMAN24 Bandung</h1>
        <div class="grid mt-4">
            <div class="col-12 lg:col-6">
                <h5>Silahkan Pilih Tanggal Presensi Dan Generate</h5>
                <Calendar id="date" v-model="date" style="width:70%;" />
            </div>
            <div class="col-12 lg:col-6">
                <h5>Silakan Pilih Kelas</h5>
                <Dropdown v-model="classroomSelect" :options="classroom" optionLabel="name"
                    placeholder="Silakan Pilih Kelas" />
            </div>
        </div>
        <h3>Generate siswa yang tidak melakukan presensi (Absen)</h3>
        <Button type="button" icon="pi pi-upload" label="Generate" class="p-button mb-2" @click="generateDialog = true" />
    </div>
    <div className="card">
        <DataTable ref="dt" :value="siswa" :paginator="true" class="p-datatable-gridlines" :rows="20" dataKey="id"
            :rowHover="true" :rowsPerPageOptions="[20, 50, 100]" v-model:filters="filters" filterDisplay="menu"
            :loading="loading" :filters="filters" responsiveLayout="scroll" :globalFilterFields="['name', 'NIS', 'NISN']"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students">
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <div class="text-align-left gap-2">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2"
                            @click="clearFilter()" />
                        <Button type="button" icon="pi pi-upload" label="Export" class="p-button-outlined mb-2"
                            @click="exportCSV()" />
                    </div>
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search"></i>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                    </span>
                </div>
            </template>
            <template #empty> Data Tidak Ditemukan. </template>
            <template #loading> Memuat Data Presensi, Mohon Tunggu. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="NISN" header="NISN" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.NISN }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="classroom_name" header="Kelas" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.classroom_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="gender" header="Kelamin" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.code }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="timestamp" header="timestamp" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.timestamp }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="is_late" header="Status" style="min-width: 12rem">
                <template #body="{ data }">
                    <div v-if="data.is_late == true">
                        Terlambat
                    </div>
                    <div v-else>
                        Tepat Waktu
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by NISN" />
                </template>
            </Column>
        </DataTable>
    </div>
    <Dialog v-model:visible="generateDialog" modal header="Generate" :style="{ width: '50rem' }">
        <h3>Apakah Anda Yakin?</h3>
        <p>
            Untuk melakukan penghasilan data, waktu yang dibutuhkan tidak sebentar (tergantung pada jumlah data yang
            dibutuhkan). Mohon untuk <b>tidak menutup browser dan tab pada browser ketika proses berlangsung</b>. Pastikan
            pula
            bahwa koneksi internet Anda stabil.
        </p>

        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="generateDialog = false"></Button>
            <Button type="button" label="Generate" :loading="buttonDialogLoading"
                @click="generateStudentDidNotTapping"></Button>
        </div>
    </Dialog>
</template>


<style scoped></style>