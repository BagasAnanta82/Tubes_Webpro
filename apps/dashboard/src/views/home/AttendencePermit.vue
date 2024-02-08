<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import AttendencePermitService from '@/service/AttendencePermitService';
import AttendencePermitTypeService from '@/service/AttendencePermitTypeService';

const toast = useToast();

const dt = ref(null);
const permits = ref(null);
const selectedPermits = ref(null);
const dialog = ref({});
const date = ref(new Date());
const permitType = ref(null);
const filters = ref({});
const updateDialog = ref(false);
const deletePermitDialog = ref(false);
const deleteSelectPermitDialog = ref(false);


const attandencePermitService = new AttendencePermitService()
const attandencePermitTypeService = new AttendencePermitTypeService()

onBeforeMount(() => {
    initFilters()
})

onMounted(() => {
    attandencePermitService.getStudentAttandencePermitRecords().then((data) => permits.value = data)
    attandencePermitTypeService.getAttendencePermitTypeService().then((data) => permitType.value = data)
})


const hideDialog = () => {
    dialog.value = {};
    updateDialog.value = false;
}

const editPermitDialog = (data) => {
    dialog.value = { ...data };
    dialog.value.permit_type_id = permitType.value.filter((data) => {
        return data.id == dialog.value.permit_type_id
    })[0]

    updateDialog.value = true;
}

const editPermit = async () => {
    const time = new Date(date.value)
    await attandencePermitService.updateStudentAttandencePermitRecords(dialog.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Memperbaharui Presensi Siswa', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Memperbaharui Presensi Siswa', life: 3000 })
    ))
    await attandencePermitService.getStudentAttandencePermitRecords(time.toISOString()).then((data) => permits.value = data)
    dialog.value = {};
    updateDialog.value = false;
}

const confirmDeletePermit = (data) => {
    dialog.value = { ...data }
    deletePermitDialog.value = true
}

const deletePermit = async () => {
    const time = new Date(date.value)
    await attandencePermitService.deleteStudentAttandencePermitRecord(dialog.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menghapus Presensi Siswa', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus Presensi Siswa', life: 3000 })
    ))
    await attandencePermitService.getStudentAttandencePermitRecords(time.toISOString()).then((data) => permits.value = data)
    dialog.value = {}
    deletePermitDialog.value = false;
}

const deleteSelectedPermit = async () => {
    const time = new Date(date.value)
    await attandencePermitService.deleteMutltipleStudentAttandencePermitRecord(selectedPermits.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menghapus Presensi Siswa', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus Presensi Siswa', life: 3000 })    
    ))
    await attandencePermitService.getStudentAttandencePermitRecords(time.toISOString()).then((data) => permits.value = data)
    selectedPermits.value = null;
    deleteSelectPermitDialog.value = false;
}

const exportCSV = () => {
    dt.value.exportCSV();
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

watch(date, async (newVal, oldVal) => {
    const time = new Date(newVal)
    time.setDate(time.getDate() + 1)
    attandencePermitService.getStudentAttandencePermitRecords(time.toISOString()).then((data) => permits.value = data)
})
</script>

<template>
    <div class="card">
        <h3>Silahkan Pilih Tanggal</h3>
        <Calendar v-model="date" style="width: 70%;" />
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteSelectPermitDialog = true" :disabled="!selectedPermits || !selectedPermits.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="permits"
                    v-model:selection="selectedPermits"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Pencapaian SMAN 24</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.student_name }}
                        </template>
                    </Column>
                    <Column field="NIS" header="NIS" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">NIS</span>
                            {{ slotProps.data.NIS }}
                        </template>
                    </Column>
                    <Column field="classroom_name" header="Kelas" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Kelas</span>
                            {{ slotProps.data.classroom_name }}
                        </template>
                    </Column>
                    <Column field="code" header="Kelamin" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">code</span>
                            {{ slotProps.data.code }}
                        </template>
                    </Column>
                    <Column field="permit_type_name" header="Status Presensi" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Presensi</span>
                            {{ slotProps.data.permit_type_name }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editPermitDialog(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeletePermit(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="updateDialog" :style="{ width: '450px' }" header="Edit Data Pencapaian" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nama Siswa</label>
                        <InputText id="name" disabled v-model.trim="dialog.student_name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Status Presensi</label>
                        <Dropdown id="inventoryStatus" v-model="dialog.permit_type_id" :options="permitType" optionLabel="name" />
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="editPermit" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deletePermitDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dialog"
                            >Apakah Anda Yakin Untuk Menghapus Data <b>{{ dialog.student_name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deletePermitDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletePermit" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteSelectPermitDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dialog">Apakah Anda Yakin Untuk Menghapus Data Yang Dipilih?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSelectPermitDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedPermit" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>