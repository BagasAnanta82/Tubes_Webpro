<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import SiswaService from '@/service/SiswaService';
import AchievementService from '@/service/AchievementService';
import StudentAchievementService from '@/service/StudentAchievementService';


const toast = useToast();

const students = ref(null);
const achievement = ref({});
const achievementDialog = ref({});
const productDialog = ref(false);
const studentDialog = ref(false);
const productDialogUpdate = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const filtersDialog = ref({});
const submitted = ref(false);
const loading = ref(true);

const siswaService = new SiswaService();
const achievementService = new AchievementService();
const studentAchievementService = new StudentAchievementService();

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    siswaService.getAllStudentData().then((data) => (students.value = data));
    achievementService.getAllAchievement().then((data) => (achievement.value = data));
    loading.value = false;
});

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    studentDialog.value = false;
    achievementDialog.value = {};
    submitted.value = false;
};

const saveProduct = async () => {
    submitted.value = true;
    await studentAchievementService.createStudentAchievement(product.value).then((res) => {
        if (!res.status) {
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Untuk Membuat Data Siswa', life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Tambah Siswa', life: 3000 });
        }
    })
    productDialog.value = false;
    product.value = {};
};

const showStudentData = async (editProduct) => {
    await studentAchievementService.getStudentAchievementById(editProduct.student_id).then((data) => {
        achievementDialog.value.student = data.student;
        achievementDialog.value.score = data.total_score;
    });
    studentDialog.value = true;
}

const editProductDialog = (editProduct) => {
    
}

const editProduct = async () => {
    await siswaService.updateStudentData(product.value).then((res) => {
        if (res) {
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Untuk Delete Data Siswa', life: 3000 });
        } else {
            toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Untuk Delete Data Siswa', life: 3000 });
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
    await studentAchievementService.deleteStudentAchievement(product.value.id).then((res) =>
        res.status ? toast.add({ severity: 'success', summary: 'Successful', detail: 'berhasil menghapus data', life: 3000 })
            : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus data siswa', life: 3000 }))
    await studentAchievementService.getStudentAchievementById(product.value.student_id).then((data) => (achievementDialog.value = data));
    product.value = {};
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const deleteSelectedProducts = async () => {
    await studentAchievementService.deleteStudentAchievement(selectedProducts.value).then((res) => (
        res.status ?
            toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Siswa Terhapus', life: 3000 })
            : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Siswa Gagal Terhapus', life: 3000 })))
    await studentAchievementService.getStudentAchievementById().then((data) => (students.value = data));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };

    filtersDialog.value = {
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
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable 
                    ref="dt" 
                    :value="students" 
                    dataKey="id" 
                    :paginator="true"
                    :rows="20" 
                    :filters="filters"
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
                    <Column header="action" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-search" class="p-button-rounded p-button-primary mr-2"
                                @click="showStudentData(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
                    class="p-fluid">
                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Pencapaian</label>
                        <Dropdown id="inventoryStatus" v-model="product.achievement" :options="achievement" optionLabel="name" />
                    </div>

                    <div class="field">
                        <label for="multipleStatus" class="mb-3">Pencapaian</label>
                        <MultiSelect id="multipleStatus" v-model="product.students" :options="students" optionLabel="name" placeholder="Pilih Siswa" :filter="true">
                            <template #value="slotProps">
                                <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.id">
                                    <!-- <span :class="'mr-2 flag flag-' + option.name.toLowerCase()" style="width: 18px; height: 12px" /> -->
                                    <div>{{ option.name }}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Pilih Siswa</div>
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <!-- <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" /> -->
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>

                    <div class="field">
                        <label for="description">Deskripsi</label>
                        <Textarea id="description" v-model.trim="product.description" :required="true" autofocus />
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

                <Dialog v-model:visible="studentDialog" :style="{ width: '950px' }" header="Data Pencapaian" :modal="true"
                    class="p-fluid">

                    <DataTable 
                        ref="dt" 
                        :value="achievementDialog.student" 
                        v-model:selection="selectedProducts" 
                        dataKey="id"
                        :paginator="true" :rows="5" 
                        :filters="filtersDialog"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 15]" 
                        :loading="loading"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
                        responsiveLayout="scroll">
                        <template #header>
                            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                                <h5 class="m-0">Data Pencapaian SMAN 24</h5>
                                <span class="block mt-2 md:mt-0 p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filtersDialog['global'].value" placeholder="Search..." />
                                </span>
                            </div>
                        </template>

                        <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                        <Column field="achievement_name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Name</span>
                                {{ slotProps.data.achievement_name }}
                            </template>
                        </Column>
                        <Column field="achievement_code" header="Kode Pencapaian" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Code</span>
                                {{ slotProps.data.achievement_code }}
                            </template>
                        </Column>
                        <Column field="achievement_code" header="Deskripsi" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Deskripsi</span>
                                {{ slotProps.data.description }}
                            </template>
                        </Column>
                        <Column field="achievement_score" header="Nilai" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Nilai</span>
                                {{ slotProps.data.achievement_score }}
                            </template>
                        </Column>
                        <Column field="timestamp" header="Timestamp" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Nilai</span>
                                {{ slotProps.data.timestamp }}
                            </template>
                        </Column>
                        <Column header="action" headerStyle="min-width:10rem;">
                            <template #body="slotProps">
                                <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editProductDialog(slotProps.data)" /> -->
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                            </template>
                        </Column>
                        <template #footer #body="slotProps">Total Score {{ achievementDialog.score }}</template>
                    </DataTable>

                    <template #footer>
                        <Button label="Close" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
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
