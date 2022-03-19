<template>
    <v-row dense>
        <v-col md="9" xs="12">
            <div class="wrapper rounded-lg pa-3">
                <slot />
            </div>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" md="3">
            <div class="wrapper rounded-lg pa-3">
                <div class="catalog__filters">filters</div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'TheCatalog',
};
</script>

<style scoped lang="scss">
.catalog {
    &__filters {
    }
}
</style>
