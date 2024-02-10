<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    text : String
})

const findUrl = (t) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (t == null) {
        return "";
    }

    if(t.search(urlRegex) != -1){
        return t.match(urlRegex)[0]
    }

    return "";
}

const urlOrigin = (t) => {
    if(t.search("drive.google.com") != -1){
        return t.replace("view?usp=sharing", "preview");
    }

    return t;
}


const url = ref(urlOrigin(findUrl(props.text)))

</script>

<template>
    <template v-if="url != ''">
        <iframe :src="url" width="500" class="mt-0 mx-auto mb-5 block shadow-2" frameborder="0"></iframe>
    </template>
</template>