<template>
    <!--    <div class="stub" />-->
    <div>
        <TheCatalog> products </TheCatalog>
    </div>
</template>

<script>
import TheCatalog from '@/components/layout/TheCatalog';
export default {
    name: 'CatalogPage',
    components: {
        TheCatalog,
    },
};
</script>

<style scoped lang="scss">
.stub {
    min-height: 1000px;
}
</style>
