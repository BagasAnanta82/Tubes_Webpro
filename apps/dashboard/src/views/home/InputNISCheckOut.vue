<script setup>
import { ref, onMounted, computed, watch} from 'vue';
import Swal from "sweetalert2";
import { useLayout } from '@/layout/composables/layout';
import PresensiService from '@/service/PresensiService'


const { layoutConfig } = useLayout();

const isDisabled = ref(false);
const nis = ref('');

const presensiService = new PresensiService();

const TelkomLogo = computed(() => {
  return '/telkomuniversityLogo.png'
})

const caatisLogo = computed(() => {
  return '/caatisLogo.png'
})

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

onMounted(() => {
  document.title = "Absensi SMAN 24 Bandung";
});

watch(isDisabled, (newVal, old) => {
  document.getElementById("nameInput").focus();
})

const handleSubmit = async (event) => {
  event.preventDefault()

  isDisabled.value = true;
  document.getElementById("overlay").style.display = "block";

  await presensiService.studentCheckOut(nis.value).then((res) => {
    if (res.status === false) {
      Swal.fire({
        title: "gagal untuk melakukan presensi",
        text: res.message,
        icon: "error",
        timer: 1000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: "berhasil melakukan absesi",
        text : res.message,
        icon: "success",
        timer: 1000,
        showConfirmButton: false
      });
    }
  })


  isDisabled.value = false;
  nis.value = "";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("nameInput").focus();
};
</script>

<template>
  <div class="container">
    <div>
      <a href="https://sman24bdg.sch.id/" target="_blank">
        <img :src="logoUrl" className="logo react" alt="SMAN 24 Bandung" />
      </a>
    </div>
    <h1>Presensi SMAN 24 Bandung</h1>
    <div className="card">
      <form @submit="handleSubmit">
        <input type="text" name="nis" id="nameInput" autofocus v-model="nis" />
      </form>
      <p style="text-align: center;">Created And Supported By</p>
      <div>
        <a href="https://telkomuniversity.ac.id" target='_blank'>
          <img :src="TelkomLogo" alt="Telkom University" style="height: 20%; width : 20%; margin-right: 5px; margin-left: 23%;" />
        </a>
        <a href="https://caatis.matradipti.org/" target="_blank">
          <img :src="caatisLogo" alt="CAATIS-RA" style="height : 30%; width : 30%; margin-left : 5px" />
        </a>
      </div>
    </div>
    <div id="overlay">
      <div className="spinner"></div>
    </div>
  </div>
</template>

<style scoped>

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color: "#00000000";
  background-color: #ffffff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 15em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

#nameInput {
  border-radius: 12px;
  height: 60px;
  width: 500px;
  font-size: large;
  text-align: center;
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

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container div{
  width: auto;
  height: auto;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
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

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(359deg);
  }
}

@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(359deg);
  }
}

@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }

  to {
    -o-transform: rotate(359deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
</style>
