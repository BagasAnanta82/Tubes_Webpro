<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import Sidebar from 'primevue/sidebar';

import { ref, onBeforeMount, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

onBeforeMount(() => {
    CheckFirstUser()
    initConfigApp()
})

const CheckFirstUser = () => {
    if (window.localStorage.getItem("darkmode") == null) {
        window.localStorage.setItem("darkmode", false)
    }

    if (window.localStorage.getItem("scale") == null) {
        window.localStorage.setItem("scale", 14)
    }

    if (window.localStorage.getItem("menuMode") == null) {
        window.localStorage.setItem("menuMode", "static")
    }

    if (window.localStorage.getItem("ripple") == null) {
        window.localStorage.setItem("ripple", false)
    }
}

const initConfigApp = () => {
    layoutConfig.scale.value = Number(window.localStorage.getItem("scale"));
    layoutConfig.menuMode.value = window.localStorage.getItem("menuMode");
    layoutConfig.ripple.value = window.localStorage.getItem("ripple") == "true";

    applyScale()

    if (window.localStorage.getItem("darkmode") == "true") {
        onChangeTheme('lara-dark-indigo', 'dark')
    }else{
        onChangeTheme('lara-light-indigo', 'light')
    }
}

const scales = ref([12, 13, 14, 15, 16]);
const visible = ref(false);
const darkmode = ref(window.localStorage.getItem("darkmode") == "true");

const { changeThemeSettings, setScale, layoutConfig } = useLayout();

const onConfigButtonClick = () => {
    visible.value = !visible.value;
};
const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    window.localStorage.setItem("scale", layoutConfig.scale.value)
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    window.localStorage.setItem("scale", layoutConfig.scale.value)
    applyScale();
};
const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};
watch(darkmode, async (newVal, oldVal) => {
    window.localStorage.setItem("darkmode", newVal)

    if (newVal) {
        onChangeTheme('lara-dark-indigo', 'dark')
    } else {
        onChangeTheme('lara-light-indigo', 'light')
    }
})
watch(layoutConfig.menuMode, (newVal, oldVal) => {
    window.localStorage.setItem("menuMode", newVal)
})
watch(layoutConfig.ripple, (newVal, oldVal) => {
    window.localStorage.setItem("ripple", newVal)
})
</script>

<template>
    <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
        <i class="pi pi-cog"></i>
    </button>

    <Sidebar v-model:visible="visible" position="right" :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'" class="layout-config-sidebar w-20rem">
        <h5>Scale</h5>
        <div class="flex align-items-center">
            <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
            </div>
            <Button icon="pi pi-plus" type="button" pButton @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
        </div>

        <template v-if="!simple">
            <h5>Menu Type</h5>
            <div class="flex">
                <div class="field-radiobutton flex-1">
                    <RadioButton name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                    <label for="mode1">Static</label>
                </div>

                <div class="field-radiobutton flex-1">
                    <RadioButton name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                    <label for="mode2">Overlay</label>
                </div>
            </div>
        </template>

        <template v-if="!simple">
            <h5>Ripple Effect</h5>
            <InputSwitch v-model="layoutConfig.ripple.value"></InputSwitch>

            <h5>Dark Mode</h5>
            <InputSwitch v-model="darkmode"></InputSwitch>
        </template>
    </Sidebar>
</template>

<style lang="scss" scoped></style>
