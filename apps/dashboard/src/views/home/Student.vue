<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import SiswaService from '@/service/SiswaService';
import { useToast } from 'primevue/usetoast';
import ClassroomService from '@/service/ClassroomService'
import GenderService from '@/service/GenderService'

const toast = useToast();

const students = ref(null)
const classroom = ref(null)
const gender = ref(null)
const productDialog = ref(false);
const productDialogUpdate = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const loading = ref(true);

const siswaService = new SiswaService();
const classroomService = new ClassroomService()
const genderService = new GenderService()

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    siswaService.getAllStudentData().then((data) => (students.value = data));
    classroomService.getAllClassroom().then((data) => (classroom.value = data));
    genderService.getAllGender().then((data) => (gender.value = data))
    loading.value = false;
});

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    productDialogUpdate.value = false;
    submitted.value = false;
};

const saveProduct = async () => {
    submitted.value = true;
    await siswaService.createStudentData(product.value).then((res) => {
        if (!res.status) {
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Untuk Membuat Data Siswa', life: 3000 });
        }else{
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Tambah Siswa', life: 3000 });
        }
    })
    await siswaService.getAllStudentData().then((data) => (students.value = data));
    productDialog.value = false;
    product.value = {};
};

const showEditDialog = (editProduct) => {
    product.value = { ...editProduct };
    productDialogUpdate.value = true;
}

const editProduct = async () => {
    await siswaService.updateStudentData(product.value).then((res) => {
        if (res) {
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Untuk Pemperbaharui Data Siswa', life: 3000 });
        }else{
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Untuk Memperbaharui Data Siswa', life: 3000 });
        }
    })
    await siswaService.getAllStudentData().then((data) => (students.value = data));
    productDialogUpdate.value = false;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = async () => {
    deleteProductDialog.value = false;
    await siswaService.deleteStudent(product.value.student_id).then((res) => 
    res ? toast.add({ severity: 'success', summary: 'Successful', detail: 'berhasil menghapus data', life: 3000 })
    : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus data siswa', life: 3000 }))
    await siswaService.getAllStudentData().then((data) => (students.value = data));
    product.value = {};
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = async () => {
    await siswaService.deleteMultipleStudent(selectedProducts.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Siswa Terhapus', life: 3000 })
            : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Siswa Gagal Terhapus', life: 3000 })))
    await siswaService.getAllStudentData().then((data) => (students.value = data));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

watch(product, (newval, old) => {

})

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
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
                                :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="students" v-model:selection="selectedProducts" dataKey="student_id"
                    :paginator="true" :rows="20" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[20, 50, 75, 100]"
                    :loading="loading"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Data Siswa SMAN 24 Bandung</h5>
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
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="showEditDialog(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Penambahan Data Siswa" :modal="true"
                    class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">NIS</label>
                        <InputText id="name" type="number" v-model.trim="product.NIS" :required="true"
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.NIS">NIS is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">NISN</label>
                        <InputText id="name" type="number" v-model.trim="product.NISN" :required="true"
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.NISN">NIS is required.</small>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Kelas</label>
                        <Dropdown id="inventoryStatus" v-model="product.classroom_id" :options="classroom" optionLabel="name" />
                    </div>

                    <div class="field">
                        <label class="mb-3">Kelamin</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6" v-for="genderData in gender">
                                <RadioButton id="category2" :name="genderData.code" :value="genderData.id"
                                    v-model="product.gender_id" />
                                <label for="category2">{{ genderData.gender }}</label>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Apakah Anda Yakin Untuk Menghapus Siswa <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="productDialogUpdate" :style="{ width: '450px' }" header="Edit Data Siswa" :modal="true"
                    class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">NIS</label>
                        <InputText id="name" type="number" v-model.trim="product.NIS" :required="true"
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.NIS">NIS is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">NISN</label>
                        <InputText id="name" type="number" v-model.trim="product.NISN" :required="true"
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.NISN">NIS is required.</small>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Kelas</label>
                        <Dropdown id="inventoryStatus" v-model="product.classroom_id" :options="classroom" optionLabel="name" />
                    </div>

                    <div class="field">
                        <label class="mb-3">Kelamin</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6" v-for="genderData in gender">
                                <RadioButton id="category2" :name="genderData.code" :value="genderData.id"
                                    v-model="product.gender_id" />
                                <label for="category2">{{ genderData.gender }}</label>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="editProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Apakah Anda Yakin Untuk Menghapus Siswa <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Apakah Anda Yakin Untuk Menghapus Data-Data Siswa?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
