<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';

const isDisabled = ref(true);
const nis = ref('');
const nisInput = ref(null);

watch(isDisabled, (newVal) => {
  if (newVal) {
    nisInput.value.focus();
  }
});

onMounted(() => {
  document.title = "Absensi SMAN 24";
});

const handleSubmit = async () => {
  isDisabled.value = false;
  document.getElementById("overlay").style.display = "block";

  const formData = new FormData();
  formData.append("nis", nis.value);

  // post an api
  const response = await fetch("url", {
    method: "POST",
    body: formData
  });
  const res = await response.json();

  if (res.status === false) {
    await Swal.fire({
      title: "gagal untuk melakukan presensi",
      text: "telah melakukan presensi sebelumnya",
      icon: "error",
      timer: 1000,
      showConfirmButton: false
    });
  } else {
    await Swal.fire({
      title: "berhasil melakukan absesi",
      icon: "success",
      timer: 1000,
      showConfirmButton: false
    });
  }

  isDisabled.value = true;
  nis.value = "";
  document.getElementById("overlay").style.display = "none";
};
</script>

<template>
  <div>
    <img class='smanLogo' src=./assets/sman24Logo.png alt="SMAN BANDUNG 24 logo" />
  </div>

   <h1 class="size">PRESENSI SMA 24 BANDUNG</h1>
      
  <div v-show="!isDisabled"></div>
    <form @submit.prevent="handleSubmit">
      <input 
        type="text" 
        name="nis" 
        id="nameInput" 
        v-model="nis" 
        ref="nisInput" 
        :disabled="!isDisabled" 
        autofocus 
      />
    </form>

  <p>Created And Supported By</p>

  <img class='teluLogo' src=./assets/telkomuniversityLogo.png alt="Telkom University"/>

  <img class='caatisLogo'src=./assets/caatisLogo.png alt="CAATIS-RA"/>
   
  <div id="overlay">
    <div class="spinner"></div>
  </div>
  <RouterView />
</template>

<style scoped>
.smanLogo{
  height: "20%";
  width: "20%"; 
  margin-right:"5px"
}

.teluLogo {
  height : "20%";
  width : "20%";
  margin-right : "5px"
}

.caatisLogo {
  height : "30%"; 
  width : "30%";
  margin-left: "5px"
}

.size {
  font-size:4ch;
}
</style>
