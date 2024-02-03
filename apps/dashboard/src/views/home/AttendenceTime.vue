<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import AttendenceTimeService from '@/service/AttendenceTimeService'
import { useToast } from 'primevue/usetoast';

const timeData = ref({})
const toast = useToast()

const attendenceTimeService = new AttendenceTimeService()

onBeforeMount(() => {
    attendenceTimeService.getAttandenceTime().then((data) => (timeData.value = data[0]))
})

const handleSaveTime = async () => {
    await attendenceTimeService.updateAttandenceTime(timeData.value).then((res) => (res.status ? 
    toast.add({severity : "success", summary: "Gagal", detail : "Berhasil Update Waktu Presensi", life : 3000}) : 
    toast.add({severity : "error", summary : "Gagal", detail : "Gagal Untuk Update Waktu Presensi", life : 3000})))
}

</script>

<template>
    <div class="card">
        <Toast />
        <h1 class="text-center">Konfigurasi Waktu Presensi</h1>
        <Message>Penginputan jam merupakan nilai dengan 1 - 24. Dan menit dalam 1 - 60</Message>
        <h3>Jam</h3>
        <InputNumber :min="1" :max="24" v-model="timeData.hours" />
        <h3>Menit</h3>
        <InputNumber :min="0" :max="60" v-model="timeData.minutes" />
        <h3>Terakhir Update</h3>
        <InputText v-model="timeData.updated_at" disabled />
        <br><br><br>
        <Button label="Save" icon="pi pi-check" @click="handleSaveTime" />
    </div>
</template>

<style scoped>

</style>