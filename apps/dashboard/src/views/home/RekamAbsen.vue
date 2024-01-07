<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PresensiService from '@/service/PresensiService'

const siswa = ref(null)
const filters = ref(null)
const loading = ref(true)
const date = ref(null)
const dt = ref(null)

const presensiService = new PresensiService()

const handleChangeDate = () => {
    presensiService.getStudentAttendences(new Date(date.value).toISOString()).then((val) => (siswa.value = val))
    console.log(siswa.value);
}

onBeforeMount(() => {
    loading.value = false
    initFilter()
})

onMounted(() => {
    presensiService.getStudentAttendences().then((data) => (siswa.value = data))
})

const initFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NIS: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NISN: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
}

const clearFilter = () => {
    initFilter()
}

const exportCSV = () => {
    dt.value.exportCSV();
};
</script>

<template>
    <div class="card">
        <h1>Rekam Presensi SMAN24 Bandung</h1>
        <div class="flex flex-column justify-content-left gap-2">
            <label for="date">Silahkan Pilih Tanggal Presnesi</label>
            <Calendar id="date" v-model="date" @click="handleChangeDate()" dateFormat="dd/mm/yy" />
        </div>
    </div>
    <div className="card">
        <DataTable
            ref="dt"
            :value="siswa"
            :paginator="true"
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters"
            filterDisplay="menu"
            :loading="loading"
            :filters="filters"
            responsiveLayout="scroll"
            :globalFilterFields="['name', 'NIS', 'NISN']"
        >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <div class="text-align-left gap-2">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter()" />
                        <Button type="button" icon="pi pi-upload" label="Export" class="p-button-outlined mb-2" @click="exportCSV()" />
                    </div>
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search"></i>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                    </span>
                </div>
            </template>
            <template #empty> Data Tidak Ditemukan. </template>
            <template #loading> Memuat Data Siswa, Mohon Tunggu. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="NISN" header="NISN" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.NISN }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="NIS" header="NIS" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.NIS }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by NIS" />
                </template>
            </Column>
            <Column field="gender" header="Kelamin" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.code }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="timestamp" header="timestamp" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.timestamp }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by NISN" />
                </template>
            </Column>
            <Column field="is_late" header="Status Keterlambatan" style="min-width: 12rem">
                <template #body="{ data }">
                    <div v-if="data.is_late == true">
                        Terlambat
                    </div>
                    <div v-else>
                        Tepat Waktu
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by NISN" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>


<style scoped>

</style>