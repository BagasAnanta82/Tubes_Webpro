<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import Swal from 'sweetalert2';

const isDisabled = ref(true);
const nis = ref('');
const nisInput = ref(null);

watch(isDisabled, (newVal) => {
  if (newVal) {
    nisInput.value.focus();
  }
});

const TelkomLogo = computed(() => {
  return '/telkomuniversityLogo.png'
})

const caatisLogo = computed(() => {
  return '/caatisLogo.png'
})

onMounted(() => {
  document.title = "Absensi SMAN 24";
});

const handleSubmit = async () => {
  isDisabled.value = false;
  document.getElementById("overlay").style.display = "block";

  const formData = new FormData();
  formData.append("nis", nis.value);
  
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
    <img class='smanLogo' src=../../../public/sman24Logo.png alt="SMAN BANDUNG 24 logo" />
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

  <img class='teluLogo' :src="TelkomLogo" alt="Telkom University"/>

  <img class='caatisLogo' :src="caatisLogo" alt="CAATIS-RA"/>
   
  <div id="overlay">
    <div class="spinner"></div>
  </div>
  <RouterView />
</template>

<style scoped>

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.smanLogo {
  height: 15em;
  padding: 1,5em;
  will-change: filter;
  transition: filter 300ms;
}

.smanLogo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.smanLogo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

#nameInput {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border-color: #1E90FF;
  border-radius: 12px;
  height: 60px;
  width: 500px;
  font-size: large;
  text-align: center;
}

.card {
  padding: 2em;
}

#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

.spinner {
  position: absolute;
  top: 44%;
  left: 47%;
  height: 60px;
  width: 60px;
  margin: auto;
  display: flex;
  -webkit-animation: rotation .6s infinite linear;
  -moz-animation: rotation .6s infinite linear;
  -o-animation: rotation .6s infinite linear;
  animation: rotation .6s infinite linear;
  border-left: 6px solid rgba(0, 174, 239, .15);
  border-right: 6px solid rgba(0, 174, 239, .15);
  border-bottom: 6px solid rgba(0, 174, 239, .15);
  border-top: 6px solid rgba(0, 174, 239, .8);
  border-radius: 100%;
}
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
