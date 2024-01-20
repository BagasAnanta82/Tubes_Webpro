<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="layout-footer">
        <b class="">Created And Supported By <a href="https://caatis.matradipti.org/">CAATIS-RA</a> And <a href="https://telkomuniversity.ac.id/">Telkom University</a></b>
    </div>
</template>
<style lang="scss" scoped></style>
