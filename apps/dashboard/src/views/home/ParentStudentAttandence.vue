<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import SiswaService from '@/service/SiswaService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();
const toast = useToast()


const students = ref([])
const value = ref("")

const siswaService = new SiswaService()

onBeforeMount(() => {
    // siswaService.getAllStudentData().then((data) => (students.value = data))
})

const search = () => {

}

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

</script>

<template>
    <div class="card">
        <div class="layout-topbar">
            <router-link to="#" class="layout-topbar-logo">
                <img :src="logoUrl" alt="logo" />
                <span>SMAN 24 Bandung</span>
            </router-link>
            <span class="title-navbar">Presensi Siswa</span>
        </div>
        <div class="content">
            <h1>test</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta repellendus ipsa labore eum, amet at quae dolorum reiciendis, eveniet rem commodi ut, expedita debitis harum. Nesciunt quaerat iusto necessitatibus dicta.</p>
            <AutoComplete v-model="value" placeholder="Silakan Mencari NIS Siswa" inputStyle="width:100%;" focus :suggestions="students" @complete="search" />
        </div>
    </div>
</template>

<style scoped>
.title-navbar{
    justify-self: center;
    margin-left: 25%;
    font-size: 24px;
    font-weight: bold;
}
.content{
    flex: 1;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
    text-align: center;
    margin-top: 5rem;
}

.p-autocomplete{
    width: 100%;
}
</style>