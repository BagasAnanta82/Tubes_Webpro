<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import AchievementService from '@/service/AchievementService';
import SiswaService from '@/service/SiswaService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const achievement = ref(null);
const student = ref(null);
const productDialog = ref(false);
const productDialogUpdate = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

const achievementService = new AchievementService();
const siswaService = new SiswaService();

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    achievementService.getAllAchievement().then((data) => (achievement.value = data));
    siswaService.getAllStudentData().then((data) => (student.value = data))
});

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
    productDialogUpdate.value = false;
};

const saveProduct = async () => {
    submitted.value = true;
    await achievementService.createAchievement(product.value).then((res) => (
        res.status ? toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menambah Pencapaian', life: 3000 })
        : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menambah Kelas', life: 3000 })
    ))
    await achievementService.getAllAchievement().then((data) => (achievement.value = data));
    productDialog.value = false;
    product.value = {};
};

const editProductDialog = (editProduct) => {
    product.value = { ...editProduct };
    productDialogUpdate.value = true;
};

const editProduct = async () => {
    await achievementService.updateAchievement(product.value).then((res) => (
        res.status ? toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Memperbaharui Pencapaian', life: 3000 })
        : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Memperbaharui Pencapaian', life: 3000 })
    ))
    await achievementService.getAllAchievement().then((data) => (achievement.value = data));
    productDialogUpdate.value = false;
}

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = async () => {
    await achievementService.deleteAchievement(product.value.id).then((res) => (
        res.status ? toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Pencapaian Dihapus', life: 3000 })
         : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal Menghapus Pencapaian', life: 3000 })
    ));
    await achievementService.getAllAchievement().then((data) => (achievement.value = data));
    deleteProductDialog.value = false;
    product.value = {};
};


const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = async () => {
    await achievementService.deleteMultipleAchievement(selectedProducts.value).then((res) => (
        res.status ? toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Kelas Terhapus', life: 3000 })
        : toast.add({ severity: 'error', summary: 'Gagal', detail: 'Kelas Gagal Terhapus', life: 3000 })
    ))
    await achievementService.getAllAchievement().then((data) => (achievement.value = data));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

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
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="achievement"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="5"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
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
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="description" header="Dekripsi" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">description</span>
                            {{ slotProps.data.description }}
                        </template>
                    </Column>
                    <Column field="achievement_code" header="Kode Pencapaian" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Code</span>
                            {{ slotProps.data.achievement_code }}
                        </template>
                    </Column>
                    <Column field="score" header="Nilai" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nilai</span>
                            {{ slotProps.data.score }}
                        </template>
                    </Column>
                    <Column field="status" header="Status Kelas" :sortable="true" headerStyle="width:20rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">status</span>
                            {{ slotProps.data.active_status ? "Aktif" : "Tidak Aktif" }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editProductDialog(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nama Pencapaian</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>

                    <div class="field">
                        <label for="">Deskripsi</label>
                        <Textarea id="name" v-model.trim="product.description" :required="true" autofocus />
                    </div>

                    <div class="field">
                        <label for="name">kode  Pencapaian</label>
                        <InputText id="name" v-model.trim="product.achievement_code" required="true" autofocus :class="{ 'p-invalid': submitted && !product.achievement_code }" />
                        <small class="p-invalid" v-if="submitted && !product.achievement_code">Kode Pencapaian is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Nilai Pencapaian</label>
                        <InputText type="number" id="name" v-model.trim="product.score" required="true" autofocus :class="{ 'p-invalid': submitted && !product.score }" />
                        <small class="p-invalid" v-if="submitted && !product.score">Nilai Pencapaian is required.</small>
                    </div>

                    <div class="field">
                        <label class="mb-3">Status Pencapaian</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="true" :value="true" v-model="product.active_status" />
                                <label for="category1">Aktif</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="false" :value="false" v-model="product.active_status" />
                                <label for="category2">Tidak Aktif</label>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="productDialogUpdate" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nama Pencapaian</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>

                    <div class="field">
                        <label for="">Deskripsi</label>
                        <Textarea id="name" v-model.trim="product.description" :required="true" autofocus />
                    </div>

                    <div class="field">
                        <label for="name">kode  Pencapaian</label>
                        <InputText id="name" v-model.trim="product.achievement_code" required="true" autofocus :class="{ 'p-invalid': submitted && !product.achievement_code }" />
                        <small class="p-invalid" v-if="submitted && !product.achievement_code">Kode Pencapaian is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Nilai Pencapaian</label>
                        <InputText type="number" id="name" v-model.trim="product.score" required="true" autofocus :class="{ 'p-invalid': submitted && !product.score }" />
                        <small class="p-invalid" v-if="submitted && !product.score">Nilai Pencapaian is required.</small>
                    </div>

                    <div class="field">
                        <label class="mb-3">Status Pencapaian</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="true" :value="true" v-model="product.active_status" />
                                <label for="category1">Aktif</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="false" :value="false" v-model="product.active_status" />
                                <label for="category2">Tidak Aktif</label>
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
                        <span v-if="product"
                            >Apakah Anda Yakin Untuk Menghapus <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Apakah Anda Yakin Untuk Menghapus Kelas Yang Dipilih?</span>
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
