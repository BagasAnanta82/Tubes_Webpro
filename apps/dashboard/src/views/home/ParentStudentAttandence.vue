<script setup lang="ts">
import { ref, onBeforeMount, computed, watch } from 'vue';
import SiswaService from '@/service/SiswaService';
import PresensiService from '@/service/PresensiService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();
const toast = useToast()

const isLoading = ref(false)
const students = ref([])
const value = ref("")
const filterStudents = ref()
const showTable = ref(false)
const attandenceData = ref({})

const siswaService = new SiswaService()
const presensiService = new PresensiService()

onBeforeMount(() => {
    (async () => {
        await siswaService.getAllStudentActiveData().then((data) => (students.value = data))
    })()
})

const search = (event) => {
    if (!event.query.trim().length) {
        filterStudents.value = [...students.value];
    } else {
        filterStudents.value = students.value.filter((val) => {
            return val.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
    }
}

const optionLabel = (e) => {
    return e.name + " - " + e.NIS
}

const handleClick = async () => {
    isLoading.value = true;
    showTable.value = false;

    (async () => {
        await presensiService.getStudentAttendencesByStudentId(value.value).then((data) => {
            attandenceData.value = data
        })
    })()

    showTable.value = true
    isLoading.value = false;
}

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

watch(value, (val, oldVal) => {
    if (val == ""){
        showTable.value = false
        attandenceData.value = {}
    }
})

</script>

<template>
    <Toast/>
    <div class="layout-topbar">
        <BlockUI :blocked="isLoading" fullScreen />
        <router-link to="#" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>SMAN 24 Bandung</span>
        </router-link>
        <span class="title-navbar">Presensi Siswa</span>
    </div>
    <div class="content card">
        <AutoComplete v-model="value" :optionLabel="optionLabel" placeholder="Silakan Mencari Nama Siswa" inputStyle="width:100%;"
            focus :suggestions="filterStudents" @complete="search" @keyup.enter="handleClick" forceSelection>
            <template #option="slotProps">
                <div class="flex align-option-center">
                    <div>
                        {{ slotProps.option.name }} - {{ slotProps.option.NIS }}
                    </div>
                </div>
            </template>
        </AutoComplete>
    </div>
    <template v-if="showTable">
        <div class="card content">
            <h1>test</h1>
        </div>
        <div class="card content">
            <h1>test</h1>
        </div>
    </template>
</template>

<style scoped>
.title-navbar {
    justify-self: center;
    margin-left: 24%;
    font-size: 24px;
    font-weight: bold;
}

.content {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
    text-align: center;
    margin-top: 8rem;
    margin-left: 50px;
    margin-right: 50px;
}

.p-autocomplete {
    width: 100%;
}
</style>