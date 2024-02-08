<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import AttendencePermitTypeService from '@/service/AttendencePermitTypeService';
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const dt = ref(null)
const dialog = ref({})
const filters = ref({});
const permitType = ref(null)
const createNewDialog = ref(false)
const updateDialog = ref(false)
const selectedPermitType = ref(null)
const deletePermitTypeDialog = ref(false)
const deleteSelectedPermitTypeDialog = ref(false)

const attandencePermitTypeService = new AttendencePermitTypeService()

onBeforeMount(() => {
    initFilters()
})

onMounted(() => {
    attandencePermitTypeService.getAllAttendencePermitTypeService().then((data) => (permitType.value = data))
})

const openNew = () => {
    dialog.value = {};
    dialog.value.active_status = 1;
    createNewDialog.value = true;
}

const savePermitType = async () => {
    await attandencePermitTypeService.createAttendencePermitTypeService(dialog.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menambah Data', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menambah Data', life: 3000 })
    ))
    await attandencePermitTypeService.getAllAttendencePermitTypeService().then((data) => (permitType.value = data))
    dialog.value = {}
    createNewDialog.value = false;
}

const updatePermitType = async () => {
    await attandencePermitTypeService.updateAttendencePermitTypeService(dialog.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Memperbaharui Data', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Memperbaharui Data', life: 3000 })
    ))
    await attandencePermitTypeService.getAllAttendencePermitTypeService().then((data) => (permitType.value = data))
    updateDialog.value = false
    dialog.value = {}
}

const showEditPermitType = (data) => {
    dialog.value = { ...data }
    updateDialog.value = true
}

const hideDialog = () => {
    createNewDialog.value = false;
    deletePermitTypeDialog.value = false;
    deleteSelectedPermitTypeDialog.value = false;

    dialog.value = {};
}

const exportCSV = () => {
    dt.value.exportCSV()
}

const confirmDeletePermitTypeDialog = (data) => {
    dialog.value = { ...data }
    deletePermitTypeDialog.value = true;
}

const deletePermitType = async () => {
    await attandencePermitTypeService.deleteAttendencePermitTypeService(dialog.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menghapus Data', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus Data', life: 3000 })
    ))
    await attandencePermitTypeService.getAllAttendencePermitTypeService().then((data) => (permitType.value = data))
    deletePermitTypeDialog.value = false;
}

const deleteSelectedPermitType = async () => {
    await attandencePermitTypeService.deleteMutltipleAttandencePermitTypeService(selectedPermitType.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menghapus Data', life: 3000 })
          :
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus Data', life: 3000 })    
    ))
    await attandencePermitTypeService.getAllAttendencePermitTypeService().then((data) => (permitType.value = data))
    selectedPermitType.value = null;
    deleteSelectedPermitTypeDialog.value = false;
}

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteSelectedPermitTypeDialog = true"
                                :disabled="!selectedPermitType || !selectedPermitType.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable 
                    ref="dt" 
                    :value="permitType" 
                    v-model:selection="selectedPermitType" 
                    dataKey="id"
                    :paginator="true" 
                    :rows="5" 
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 15, 20]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Data Tipe Presensi SMAN24 Bandung</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:20%; min-width:20rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="active_status" header="Status" :sortable="true"
                        headerStyle="width:20%; min-width:20rem;">
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
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="showEditPermitType(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeletePermitTypeDialog(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="createNewDialog" :style="{ width: '450px' }" header="Penambahan Data Pencapaian" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nama status</label>
                        <InputText id="name" v-model="dialog.name" required="true" autofocus />
                    </div>

                    <div class="field">
                        <label class="mb-3">Status Pencapaian</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="true" :value="1" v-model="dialog.active_status" />
                                <label for="category1">Aktif</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="false" :value="0" v-model="dialog.active_status" />
                                <label for="category2">Tidak Aktif</label>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="savePermitType" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="updateDialog" :style="{ width: '450px' }" header="Penambahan Data Pencapaian" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nama status</label>
                        <InputText id="name" v-model="dialog.name" required="true" autofocus />
                    </div>

                    <div class="field">
                        <label class="mb-3">Status Pencapaian</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="true" :value="1" v-model="dialog.active_status" />
                                <label for="category1">Aktif</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="false" :value="0" v-model="dialog.active_status" />
                                <label for="category2">Tidak Aktif</label>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="updateDialog = false" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updatePermitType" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deletePermitTypeDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dialog"
                            >Apakah Anda Yakin Untuk Menghapus <b>{{ dialog.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletePermitType" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteSelectedPermitTypeDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dialog">Apakah Anda Yakin Untuk Menghapus Data Yang Dipilih?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedPermitType" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>