<template>
    <div class="catalog">
        <div class="wrapper rounded-lg pa-3">
            <slot />
        </div>
        <div class="wrapper rounded-lg pa-3">
            <div class="catalog__filters">filters</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheCatalog',
};
</script>

<style scoped lang="scss">
.catalog {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: $spacer * 3;
    height: 100vh;
    &__filters {
    }
}
</style>
